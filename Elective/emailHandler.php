<?php
/**
 * Contact Form Email Handler
 * 
 * This file handles the server-side processing of email submissions.
 * To be implemented on the server to handle actual email delivery.
 */

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set headers to handle AJAX requests
    header('Content-Type: application/json');
    
    // Get form data and sanitize
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Simple validation
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = "Please enter a valid name";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address";
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = "Please enter a message with at least 10 characters";
    }
    
    // If there are errors, return them
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }
    
    // Prepare email
    $to = 'sales@finsys.com'; // Change to your actual email
    $subject = "New Contact Form Message from $name";
    
    // Create email body
    $email_body = "You have received a new message from the FinSys contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Message:\n$message\n";
    
    // Add additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    $mail_sent = mail($to, $subject, $email_body, $headers);
    
    // Log the email attempt
    $log_file = 'contact_form_log.txt';
    $log_entry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Status: " . ($mail_sent ? 'Sent' : 'Failed') . "\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
    
    // Return response
    if ($mail_sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Your message has been sent successfully!',
            'messageId' => 'msg_' . uniqid(),
            'timestamp' => date('c')
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'There was an error sending your message. Please try again later.',
            'error' => error_get_last()['message'] ?? 'Unknown error'
        ]);
    }
} else {
    // Not a POST request
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}