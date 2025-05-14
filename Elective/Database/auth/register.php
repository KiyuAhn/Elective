<?php
include('config/db.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $pin = $_POST['pin'];

    // Insert user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password, pin) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $password, $pin);
    if ($stmt->execute()) {
        echo "<script>alert('Registration successful!'); window.location='index.php';</script>";
    } else {
        echo "<script>alert('Error: Could not register user.');</script>";
    }
}
?>

<form method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="text" name="pin" placeholder="4-digit PIN" required>
    <input type="submit" value="Register">
</form>
