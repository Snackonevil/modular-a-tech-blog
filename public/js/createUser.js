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

    const response = await fetch("./api/users", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.replace("/");
    }
};

const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", createUser);
