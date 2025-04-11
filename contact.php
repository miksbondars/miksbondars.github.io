<?php
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
}
?>