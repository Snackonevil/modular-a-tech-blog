const createPost = async e => {
    e.preventDefault();

    const postTitle = document.querySelector("#postTitle").value.trim();
    const postBody = document.querySelector("#postBody").value.trim();
    const reqBody = {
        post_title: postTitle,
        post_body: postBody,
    };
    if (postTitle == "" || postBody == "") {
        return;
    } else {
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        }
    }
};

const createBtn = document.getElementById("createPost");
createBtn.addEventListener("click", createPost);
