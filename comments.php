<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Localhost ke liye
header('Access-Control-Allow-Methods: GET, POST');

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $comment = $data['text'];

    $stmt = $conn->prepare("INSERT INTO comments (text) VALUES (:text)");
    $stmt->bindParam(':text', $comment);
    $stmt->execute();

    echo json_encode(['status' => 'success']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM comments ORDER BY created_at DESC");
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($comments);
}
?>
