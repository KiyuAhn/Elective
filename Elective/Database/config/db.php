<?php
// FILE: config/db.php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'online_banking';
//$db = new mysqli('localhost', $user, $pass, $db) or die("Unable to connect.");
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
