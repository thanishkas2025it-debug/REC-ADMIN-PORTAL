// ==========================================
// REC ADMIN PORTAL - LOGIN
// ==========================================

// SHOW / HIDE PASSWORD
function togglePassword() {

    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}


// LOGIN FUNCTION
function login() {

    // Get values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Demo login details
    const correctEmail = "admin@rec.com";
    const correctPassword = "123456";

    // Check login
    if (email === correctEmail && password === correctPassword) {

        alert("Login successful!");

        // Open dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid email or password.");

    }
}
