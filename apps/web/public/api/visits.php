<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    respond(['error' => 'Method not allowed.'], 405);
}

$dataDirectory = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.antondorovs-data';
$dataFile = $dataDirectory . DIRECTORY_SEPARATOR . 'visits.json';

if (!is_dir($dataDirectory) && !@mkdir($dataDirectory, 0750, true) && !is_dir($dataDirectory)) {
    respond(['error' => 'Counter storage is unavailable.'], 500);
}

$handle = @fopen($dataFile, 'c+');

if ($handle === false || !flock($handle, LOCK_EX)) {
    respond(['error' => 'Counter storage is unavailable.'], 500);
}

$storedValue = stream_get_contents($handle);
$storedData = is_string($storedValue) && $storedValue !== '' ? json_decode($storedValue, true) : null;
$data = is_array($storedData) ? $storedData : [];
$data['total'] = max(0, (int) ($data['total'] ?? 0));
$data['months'] = is_array($data['months'] ?? null) ? $data['months'] : [];

$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
$currentMonth = $now->format('Y-m');

if ($method === 'POST') {
    $data['total']++;
    $data['months'][$currentMonth] = max(0, (int) ($data['months'][$currentMonth] ?? 0)) + 1;

    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($data, JSON_UNESCAPED_SLASHES));
    fflush($handle);
}

$halfYear = 0;
$firstDayOfMonth = $now->modify('first day of this month')->setTime(0, 0);

for ($monthOffset = 0; $monthOffset < 6; $monthOffset++) {
    $monthKey = $firstDayOfMonth->modify(sprintf('-%d months', $monthOffset))->format('Y-m');
    $halfYear += max(0, (int) ($data['months'][$monthKey] ?? 0));
}

$response = [
    'allTime' => $data['total'],
    'halfYear' => $halfYear,
    'month' => max(0, (int) ($data['months'][$currentMonth] ?? 0)),
];

flock($handle, LOCK_UN);
fclose($handle);

respond($response);

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
