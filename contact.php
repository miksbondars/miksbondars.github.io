<?php
// Set headers to prevent caching
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $to = "miksrudolfsbondars@gmail.com";
    $subject = "Kontakti no veikala";
    $body = "Vārds: $name\nE-pasts: $email\nTālrunis: $phone\nZiņa: $message";

    mail($to, $subject, $body);
    header("Location: veikals.html?sent=true");
    exit;
} else {
    // Not a POST request
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}
?>