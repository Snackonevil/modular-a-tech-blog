const createUser = async e => {
    e.preventDefault();
    const firstName = document.getElementById("newUserFirstName").value.trim();
    const lastName = document.getElementById("newUserLastName").value.trim();
    const username = document.getElementById("newUserUsername").value.trim();
    const email = document.getElementById("newUserEmail").value.trim();
    const password = document.getElementById("newUserPassword").value.trim();
    const reqBody = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
    };

    if (password.length < 8) {
        const passAlert = document.querySelector(".password-alert");
        passAlert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Password must be at least 8 characters
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>`;
        return;
    } else {
        const response = await fetch("./api/users", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            location.replace("/");
        }
    }
};

const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", createUser);
