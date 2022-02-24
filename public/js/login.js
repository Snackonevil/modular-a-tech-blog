const handleLogin = async e => {
    e.preventDefault();

    const email = document.querySelector("#emailInput").value.trim();
    const password = document.querySelector("#passwordInput").value.trim();

    const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    const data = await response.json();
    // if (response.ok) {
    // document.location.replace("/");
    // }
    if (data.length > 0) {
        handleErrorMessages(data);
    } else {
        document.location.replace("/");
    }
};
const handleErrorMessages = messages => {
    let output = "";
    messages.forEach(message => {
        output += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>`;
    });
    const alerts = document.querySelector(".messages");
    alerts.innerHTML = output;
};

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", handleLogin);
