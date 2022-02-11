let title = document.getElementById("postTitle");
let body = document.getElementById("postBody");
const postId = new URLSearchParams(window.location.search).get("post");

const redirectToDash = () => {
    document.location.replace("/dashboard");
};

const populatePostForm = async () => {
    const response = await fetch(`api/posts/${postId}`);
    const data = await response.json();
    title.value = data.post_title;
    body.value = data.post_body;
};

window.addEventListener("load", e => {
    populatePostForm();
});

const updatePost = async e => {
    e.preventDefault();
    if (!title || !body) {
        alert("Post needs Title and Body");
        return;
    } else {
        const reqBody = {
            post_title: title.value,
            post_body: body.value,
        };
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response.ok ? redirectToDash() : "";
        } catch (err) {
            console.log(err);
        }
    }
};

const deletePost = async () => {
    const confirmDelete = await confirm(
        "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) {
        return;
    } else {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                redirectToDash();
            }
        } catch (err) {
            console.log(err);
        }
    }
};

const handleDelete = async e => {
    e.preventDefault();
    await deletePost();
    // await redirectToDash();
};

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", updatePost);

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", handleDelete);
