const handleLogout = async e => {
    e.preventDefault();
    let destroy = confirm("are you sure?");

    if (destroy) {
        const response = await fetch("/api/users/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        response.ok ? location.replace("/") : "";
    }
};

const destroy = document.querySelector("#destroy");
destroy.addEventListener("click", handleLogout);
