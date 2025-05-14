<?php
session_start();
include('config/db.php');

// Check if the user is an admin
if ($_SESSION['role'] !== 'admin') {
    header('Location: index.php');
    exit();
}

$users = $conn->query("SELECT u.id, u.username, a.balance FROM users u JOIN accounts a ON u.id = a.user_id");

echo "<table>";
echo "<tr><th>Username</th><th>Balance</th><th>Actions</th></tr>";
while ($user = $users->fetch_assoc()) {
    echo "<tr>";
    echo "<td>{$user['username']}</td>";
    echo "<td>{$user['balance']}</td>";
    echo "<td><a href='delete_user.php?id={$user['id']}'>Delete</a> | <a href='change_pin.php?id={$user['id']}'>Change PIN</a></td>";
    echo "</tr>";
}
echo "</table>";
?>
