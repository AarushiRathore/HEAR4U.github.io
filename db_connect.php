<?php
// Database connection variables
$servername = "127.0.0.1";  // Server name (XAMPP default is 'localhost')
$username = "root";         // Default username for XAMPP is 'root'
$password = "";             // Default password is empty
$dbname = "hear4u";    // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

echo "Connected successfully";

// Close connection (optional, but good practice)
$conn->close();
?>
