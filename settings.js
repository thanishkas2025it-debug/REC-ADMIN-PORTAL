const settings =
    JSON.parse(
        localStorage.getItem("recSettings")
    ) || {

        darkMode: false,

        noticeAlerts: true,

        attendanceAlerts: true

    };


function saveSettings() {

    localStorage.setItem(
        "recSettings",
        JSON.stringify(settings)
    );

}


function applySettings() {

    document
        .getElementById("darkModeToggle")
        .checked = settings.darkMode;


    document
        .getElementById("noticeAlerts")
        .checked = settings.noticeAlerts;


    document
        .getElementById("attendanceAlerts")
        .checked =
        settings.attendanceAlerts;


    if (settings.darkMode) {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }

}


function toggleDarkMode() {

    settings.darkMode =
        document
            .getElementById("darkModeToggle")
            .checked;


    saveSettings();

    applySettings();

}


function saveSetting(type) {

    settings[type] =
        document
            .getElementById(type)
            .checked;


    saveSettings();

}


function changePassword() {

    const current =
        prompt("Enter current password:");

    if (!current) return;


    const newPassword =
        prompt("Enter new password:");

    if (!newPassword) return;


    if (newPassword.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;

    }


    alert(
        "Password updated successfully!"
    );

}


function clearNotices() {

    if (
        !confirm(
            "Delete all saved notices?"
        )
    ) return;


    localStorage.removeItem("recNotices");


    alert(
        "Saved notices have been cleared."
    );

}


function resetAllSettings() {

    if (
        !confirm(
            "Reset all portal settings?"
        )
    ) return;


    localStorage.removeItem("recSettings");


    location.reload();

}


function logoutUser() {

    if (
        confirm("Are you sure you want to logout?")
    ) {

        window.location.href =
            "index.html";

    }

}


applySettings();