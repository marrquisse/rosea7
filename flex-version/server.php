<?php
// server.php
// Встановлюємо заголовки для роботи з JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Дозвіл на запити (CORS)

$filename = 'data.json';

// 1. Якщо це POST-запит (збереження даних з Адмінки)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримуємо "сирі" дані з тіла запиту
    $input = file_get_contents('php://input');
    
    // Перевіряємо, чи це валідний JSON
    $decoded = json_decode($input);
    
    if ($decoded !== null) {
        // Зберігаємо у файл
        file_put_contents($filename, $input);
        echo json_encode(['status' => 'success', 'message' => 'Дані успішно збережено!']);
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Помилка: некоректні дані JSON']);
    }
    exit;
}

// 2. Якщо це GET-запит (Клієнт запитує дані)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($filename)) {
        echo file_get_contents($filename);
    } else {
        // Якщо файлу ще немає, повертаємо пустий масив
        echo json_encode([]);
    }
    exit;
}
?>