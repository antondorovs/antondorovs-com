<?php

declare(strict_types=1);

const COUNTER_STORAGE_PREFIX = "<?php http_response_code(404); exit; ?>\n";
const VISITOR_COOKIE = 'advs_visitor';
const VISITOR_COOKIE_DAYS = 395;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? 'page';

if (!in_array($method, ['GET', 'POST'], true) || !in_array($action, ['page', 'unique', 'forget'], true)) {
    header('Allow: GET, POST');
    respond(['error' => 'Method not allowed.'], 405);
}
if ($method !== 'POST' && $action !== 'page') {
    respond(['error' => 'Method not allowed.'], 405);
}

$handle = openCounterStorage([
    dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.antondorovs-data',
    __DIR__ . DIRECTORY_SEPARATOR . '.antondorovs-data',
]);

if ($handle === null) {
    respond(['error' => 'Counter storage is unavailable.'], 500);
}

$storedValue = stream_get_contents($handle);
$storedValue = is_string($storedValue) && strncmp($storedValue, COUNTER_STORAGE_PREFIX, strlen(COUNTER_STORAGE_PREFIX)) === 0
    ? substr($storedValue, strlen(COUNTER_STORAGE_PREFIX))
    : $storedValue;
$storedData = is_string($storedValue) && $storedValue !== '' ? json_decode($storedValue, true) : null;
$storedData = is_array($storedData) ? $storedData : [];

$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
$today = $now->setTime(0, 0);
$todayKey = $today->format('Y-m-d');
$oldestStoredDay = $today->modify('-364 days');
$total = max(0, (int) ($storedData['total'] ?? 0));
$storedDays = is_array($storedData['days'] ?? null) ? $storedData['days'] : [];
$uniqueTotal = max(0, (int) ($storedData['uniqueTotal'] ?? 0));
$storedVisitors = is_array($storedData['visitors'] ?? null) ? $storedData['visitors'] : [];
$days = [];
$visitors = [];

foreach ($storedDays as $dayKey => $count) {
    $day = DateTimeImmutable::createFromFormat('!Y-m-d', (string) $dayKey, new DateTimeZone('UTC'));

    if ($day === false || $day < $oldestStoredDay || $day > $today) {
        continue;
    }

    $days[$day->format('Y-m-d')] = max(0, (int) $count);
}

foreach ($storedVisitors as $visitorHash => $lastSeen) {
    if (!is_string($visitorHash) || !preg_match('/^[a-f0-9]{64}$/', $visitorHash) || !is_string($lastSeen)) {
        continue;
    }
    $lastDay = DateTimeImmutable::createFromFormat('!Y-m-d', $lastSeen, new DateTimeZone('UTC'));
    if ($lastDay !== false && $lastDay >= $today->modify('-394 days') && $lastDay <= $today) {
        $visitors[$visitorHash] = $lastDay->format('Y-m-d');
    }
}

$changed = false;
if ($method === 'POST' && $action === 'page') {
    $total++;
    $days[$todayKey] = max(0, (int) ($days[$todayKey] ?? 0)) + 1;
    $changed = true;
}

if ($method === 'POST' && $action === 'unique') {
    $visitorId = $_COOKIE[VISITOR_COOKIE] ?? null;
    if (!is_string($visitorId) || !preg_match('/^[a-f0-9]{32}$/', $visitorId)) {
        $visitorId = bin2hex(random_bytes(16));
        setcookie(VISITOR_COOKIE, $visitorId, [
            'expires' => time() + VISITOR_COOKIE_DAYS * 86400,
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }
    $visitorHash = hash('sha256', $visitorId);
    if (!isset($visitors[$visitorHash])) {
        $uniqueTotal++;
    }
    $visitors[$visitorHash] = $todayKey;
    $changed = true;
}

if ($method === 'POST' && $action === 'forget') {
    $visitorId = $_COOKIE[VISITOR_COOKIE] ?? null;
    if (is_string($visitorId) && preg_match('/^[a-f0-9]{32}$/', $visitorId)) {
        $visitorHash = hash('sha256', $visitorId);
        if (isset($visitors[$visitorHash])) {
            unset($visitors[$visitorHash]);
            $changed = true;
        }
    }
    setcookie(VISITOR_COOKIE, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

if ($changed) {
    $encodedData = json_encode([
        'version' => 3,
        'total' => $total,
        'days' => $days,
        'uniqueTotal' => $uniqueTotal,
        'visitors' => $visitors,
    ], JSON_UNESCAPED_SLASHES);

    if ($encodedData === false) {
        respond(['error' => 'Counter storage is unavailable.'], 500);
    }

    rewind($handle);
    ftruncate($handle, 0);

    if (fwrite($handle, COUNTER_STORAGE_PREFIX . $encodedData) === false || !fflush($handle)) {
        respond(['error' => 'Counter storage is unavailable.'], 500);
    }
}

$response = [
    'day' => sumRecentDays($days, $today, 1),
    'week' => sumRecentDays($days, $today, 7),
    'month' => sumRecentDays($days, $today, 30),
    'year' => sumRecentDays($days, $today, 365),
    'allTime' => $total,
    'uniqueBrowsers' => [
        'day' => countRecentVisitors($visitors, $today, 1),
        'week' => countRecentVisitors($visitors, $today, 7),
        'month' => countRecentVisitors($visitors, $today, 30),
        'year' => countRecentVisitors($visitors, $today, 365),
        'allTime' => $uniqueTotal,
    ],
];

flock($handle, LOCK_UN);
fclose($handle);

respond($response);

function countRecentVisitors(array $visitors, DateTimeImmutable $today, int $numberOfDays): int
{
    $oldest = $today->modify(sprintf('-%d days', $numberOfDays - 1))->format('Y-m-d');
    $count = 0;
    foreach ($visitors as $lastSeen) {
        if ($lastSeen >= $oldest) {
            $count++;
        }
    }
    return $count;
}

function sumRecentDays(array $days, DateTimeImmutable $today, int $numberOfDays): int
{
    $total = 0;

    for ($offset = 0; $offset < $numberOfDays; $offset++) {
        $dayKey = $today->modify(sprintf('-%d days', $offset))->format('Y-m-d');
        $total += max(0, (int) ($days[$dayKey] ?? 0));
    }

    return $total;
}

function openCounterStorage(array $dataDirectories)
{
    foreach ($dataDirectories as $dataDirectory) {
        if (!is_dir($dataDirectory) && !@mkdir($dataDirectory, 0750, true) && !is_dir($dataDirectory)) {
            continue;
        }

        protectCounterStorage($dataDirectory);

        $dataFile = $dataDirectory . DIRECTORY_SEPARATOR . 'visits.php';
        $legacyDataFile = $dataDirectory . DIRECTORY_SEPARATOR . 'visits.json';
        $handle = @fopen($dataFile, 'c+');

        if ($handle !== false && flock($handle, LOCK_EX)) {
            $fileDetails = fstat($handle);

            if (is_array($fileDetails) && (int) ($fileDetails['size'] ?? 0) === 0) {
                $legacyValue = is_readable($legacyDataFile) ? @file_get_contents($legacyDataFile) : false;
                $initialValue = is_string($legacyValue) && json_decode($legacyValue, true) !== null ? $legacyValue : '{}';

                if (fwrite($handle, COUNTER_STORAGE_PREFIX . $initialValue) === false || !fflush($handle)) {
                    flock($handle, LOCK_UN);
                    fclose($handle);
                    continue;
                }

                rewind($handle);
            }

            return $handle;
        }

        if ($handle !== false) {
            fclose($handle);
        }
    }

    return null;
}

function protectCounterStorage(string $dataDirectory): void
{
    $accessFile = $dataDirectory . DIRECTORY_SEPARATOR . '.htaccess';

    if (!file_exists($accessFile)) {
        @file_put_contents($accessFile, "Require all denied\nDeny from all\n", LOCK_EX);
    }
}

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
