<?php
session_start();
include('config/db.php');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Get user's balance
$stmt = $conn->prepare("SELECT balance FROM accounts WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($balance);
$stmt->fetch();
$stmt->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Check Balance</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h2>Your Current Balance</h2>
    <p>₱<?php echo number_format($balance, 2); ?></p>
    <a href="dashboard.php">Back to Dashboard</a>
</body>
</html>
