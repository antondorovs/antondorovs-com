<?php

declare(strict_types=1);

const COUNTER_STORAGE_PREFIX = "<?php http_response_code(404); exit; ?>\n";

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
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
$days = [];

foreach ($storedDays as $dayKey => $count) {
    $day = DateTimeImmutable::createFromFormat('!Y-m-d', (string) $dayKey, new DateTimeZone('UTC'));

    if ($day === false || $day < $oldestStoredDay || $day > $today) {
        continue;
    }

    $days[$day->format('Y-m-d')] = max(0, (int) $count);
}

if ($method === 'POST') {
    $total++;
    $days[$todayKey] = max(0, (int) ($days[$todayKey] ?? 0)) + 1;

    $encodedData = json_encode([
        'version' => 2,
        'total' => $total,
        'days' => $days,
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
    'threeMonths' => sumRecentDays($days, $today, 90),
    'halfYear' => sumRecentDays($days, $today, 180),
    'year' => sumRecentDays($days, $today, 365),
    'allTime' => $total,
];

flock($handle, LOCK_UN);
fclose($handle);

respond($response);

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
