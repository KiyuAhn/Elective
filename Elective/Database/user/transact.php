<!-- FILE: transact.php -->
<?php session_start(); if (!isset($_SESSION['username'])) header("Location: index.php"); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Transact</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <h3>Select a Transaction</h3>
    <ul>
        <li><a href="verify_pin.php?action=deposit">Deposit</a></li>
        <li><a href="verify_pin.php?action=withdraw">Withdraw</a></li>
        <li><a href="verify_pin.php?action=transfer">Transfer</a></li>
        <li><a href="verify_pin.php?action=balance">Check Balance</a></li>
        <li><a href="verify_pin.php?action=paybills">Pay Bills</a></li>
    </ul>
</div>
</body>
</html>