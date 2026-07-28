const defaultProfile = {

    name: "Admin",

    email: "admin@rec.edu.in",

    phone: "+91 98765 43210",

    bio: "REC Student Management Portal Administrator."

};


let profile =
    JSON.parse(
        localStorage.getItem("recProfile")
    ) || defaultProfile;


function updateProfileUI() {

    const letter =
        profile.name.charAt(0).toUpperCase();


    document.getElementById("profileName").textContent =
        profile.name;

    document.getElementById("profileEmail").textContent =
        profile.email;

    document.getElementById("profilePhone").textContent =
        profile.phone;


    document.getElementById("topName").textContent =
        profile.name;


    document.getElementById("profileAvatar").textContent =
        letter;

    document.getElementById("topAvatar").textContent =
        letter;


    document.getElementById("fullName").value =
        profile.name;

    document.getElementById("email").value =
        profile.email;

    document.getElementById("phone").value =
        profile.phone;

    document.getElementById("bio").value =
        profile.bio;

}


document
    .getElementById("profileForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        profile = {

            name:
                document.getElementById("fullName").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            bio:
                document.getElementById("bio").value.trim()

        };


        localStorage.setItem(
            "recProfile",
            JSON.stringify(profile)
        );


        updateProfileUI();


        alert("Profile updated successfully!");

    });


function resetProfile() {

    if (!confirm("Reset profile information?")) {
        return;
    }


    profile = {...defaultProfile};


    localStorage.setItem(
        "recProfile",
        JSON.stringify(profile)
    );


    updateProfileUI();

}


function changeAvatar() {

    alert(
        "Profile photo upload will be connected to Firebase Storage later."
    );

}


updateProfileUI();