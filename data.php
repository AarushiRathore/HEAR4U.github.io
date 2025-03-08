<?php
// Database configuration
$servername = "localhost"; // or your server name
$username = "your_username"; // your MySQL username
$password = "your_password"; // your MySQL password
$dbname = "my_database"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verify password (you should hash passwords in a real application)
        if ($row['password'] === $password) {
            echo "Login successful!";
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that email.";
    }

    $stmt->close();
}

$conn->close();
?>

<!-- HTML Form -->
<form method="post" action="">
    Email: <input type="email" name="email" required>
    Password: <input type="password" name="password" required>
    <input type="submit" value="Login">
</form>
