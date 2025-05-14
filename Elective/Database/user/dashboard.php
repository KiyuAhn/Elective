<!-- FILE: dashboard.php -->
<?php session_start(); if (!isset($_SESSION['username'])) header("Location: index.php"); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo $_SESSION['username']; ?></h2>
        <a href="transact.php" class="btn">Transact</a>
        <a href="logout.php" class="btn">Logout</a>
    </div>
</body>
</html>