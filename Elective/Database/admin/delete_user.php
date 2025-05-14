<?php
include('config/db.php');
$user_id = $_GET['id'];

$conn->query("DELETE FROM users WHERE id = $user_id");
$conn->query("DELETE FROM accounts WHERE user_id = $user_id");

header('Location: admin.php');
