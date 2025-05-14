<?php
session_start();
include('config/db.php');

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

$user_id = $_SESSION['user_id'];
$success = "";
$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $amount = floatval($_POST['amount']);
    $entered_pin = $_POST['pin'];

    // Get user's correct PIN
    $stmt = $conn->prepare("SELECT pin FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($correct_pin);
    $stmt->fetch();
    $stmt->close();

    if ($entered_pin !== $correct_pin) {
        $error = "Invalid PIN.";
    } elseif ($amount <= 0) {
        $error = "Invalid amount.";
    } else {
        // Check user's current balance
        $bal_stmt = $conn->prepare("SELECT balance FROM accounts WHERE user_id = ?");
        $bal_stmt->bind_param("i", $user_id);
        $bal_stmt->execute();
        $bal_stmt->bind_result($balance);
        $bal_stmt->fetch();
        $bal_stmt->close();

        if ($amount > $balance) {
            $error = "Insufficient funds.";
        } else {
            // Deduct from balance
            $update = $conn->prepare("UPDATE accounts SET balance = balance - ? WHERE user_id = ?");
            $update->bind_param("di", $amount, $user_id);
            if ($update->execute()) {
                $success = "Successfully withdrew ₱" . number_format($amount, 2);
            } else {
                $error = "Withdrawal failed.";
            }
            $update->close();
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Withdraw Cash</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h2>Withdraw Cash</h2>

    <?php if ($success): ?>
        <p style="color: green;"><?php echo $success; ?></p>
    <?php elseif ($error): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>

    <form method="POST">
        <label for="amount">Amount (₱):</label>
        <input type="number" step="0.01" name="amount" required><br><br>

        <label for="pin">Enter PIN:</label>
        <input type="password" name="pin" maxlength="4" required><br><br>

        <input type="submit" value="Withdraw">
    </form>

    <br>
    <a href="dashboard.php">Back to Dashboard</a>
</body>
</html>
