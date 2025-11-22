<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$logFile = 'server_log.json';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if ($input) {
        $serverTime = microtime(true);
        $serverTimeFormatted = date("H:i:s") . "." . sprintf("%03d", ($serverTime - floor($serverTime)) * 1000);

        if (isset($input['batch']) && is_array($input['batch'])) {
            $dataToSave = [];
            foreach ($input['batch'] as $event) {
                $event['server_save_time'] = $serverTimeFormatted;
                $event['method'] = 'batch';
                $dataToSave[] = $event;
            }
            $currentData = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
            if (!is_array($currentData)) $currentData = [];
            $currentData = array_merge($currentData, $dataToSave);
            file_put_contents($logFile, json_encode($currentData, JSON_PRETTY_PRINT));
            
            echo json_encode(['status' => 'success', 'msg' => 'Batch saved', 'server_time' => $serverTimeFormatted]);
        } 
        else {
            $input['server_save_time'] = $serverTimeFormatted;
            $input['method'] = 'realtime';
            
            $currentData = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
            if (!is_array($currentData)) $currentData = [];
            $currentData[] = $input;
            file_put_contents($logFile, json_encode($currentData, JSON_PRETTY_PRINT));

            echo json_encode(['status' => 'success', 'msg' => 'Event saved', 'server_time' => $serverTimeFormatted]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error']);
    }
    exit;
}

if ($method === 'DELETE') {
    file_put_contents($logFile, json_encode([]));
    echo json_encode(['status' => 'cleared']);
    exit;
}

if ($method === 'GET') {
    if (file_exists($logFile)) {
        echo file_get_contents($logFile);
    } else {
        echo json_encode([]);
    }
    exit;
}
?>