// ==========================================
// REC Student Management Portal
// Login JavaScript
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

    // Get input values
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.getElementById("password").value.trim();

    // Check empty fields
    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    // Demo login
    const demoEmail = "admin@rec.com";
    const demoPassword = "123456";

    if (email === demoEmail && password === demoPassword) {

        alert("Login successful!");

        // Open dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid email or password.");

    }
}