<?php
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Moscow');

// Получаем данные из тела запроса
$json = file_get_contents("php://input");

// Декодируем JSON в ассоциативный массив
$data = json_decode($json, true);

// Формируем URL постбэка
$url = $data['url'];
foreach ($data['params'] as $key => $value) {
  $url .= $key . '=' . $value . '&';
}

// Логи получившегося URL ДО отправки
file_put_contents("log.txt", date("Y-m-d H:i:s") . ' | ' . $url . "\n", FILE_APPEND);

// Инициализируем cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

// Возвращаем ответ к JS
if ($http_code === 200) {
  echo json_encode(["status" => "success", "message" => "Постбэк отправлен"]);
  // Логи ответа от сервера ПОСЛЕ отправки
  file_put_contents("log.txt", date("Y-m-d H:i:s") . ' | ' . $response . "\n\n\n", FILE_APPEND);
} else {
  echo json_encode(["status" => "error", "message" => "Ошибка отправки постбэка: $error"]);
  // Логи ответа от сервера ПОСЛЕ отправки
  file_put_contents("log.txt", date("Y-m-d H:i:s") . ' | Error: ' . $error  . ' | Response: ' . $response . "\n\n\n", FILE_APPEND);
}

