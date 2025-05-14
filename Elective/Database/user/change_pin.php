<?php
include('config/db.php');
$user_id = $_GET['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_pin = $_POST['new_pin'];
    $conn->query("UPDATE users SET pin = '$new_pin' WHERE id = $user_id");
    echo "<script>alert('PIN changed successfully'); window.location='admin.php';</script>";
}
?>

<form method="POST">
    <input type="text" name="new_pin" placeholder="New PIN" required>
    <input type="submit" value="Change PIN">
</form>
