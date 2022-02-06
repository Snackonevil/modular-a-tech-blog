const createUser = async e => {
    const firstName = document.getElementById("newUserFirstName").value.trim();
    const lastName = document.getElementById("newUserLastName").value.trim();
    const username = document.getElementById("newUserUsername").value.trim();
    // const email = document.getElementById("newUserEmail").value.trim();
    const password = document.getElementById("newUserPassword").value.trim();
    e.preventDefault();
    console.log(firstName);
};

const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", createUser);
