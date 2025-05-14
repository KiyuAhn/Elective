<!-- FILE: verify_pin.php -->
<?php
session_start();
if (!isset($_SESSION['username'])) header("Location: index.php");
$action = $_GET['action'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Verify PIN</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <h3>Enter PIN for <?php echo ucfirst($action); ?></h3>
    <form method="POST" action="<?php echo $action; ?>.php">
        <input type="password" name="pin" placeholder="Enter 4-digit PIN" required>
        <input type="submit" value="Proceed">
    </form>
</div>
</body>
</html>