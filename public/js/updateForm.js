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
        // console.log(reqBody);
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response.ok ? await redirectToDash() : "";
        } catch (err) {
            console.log(err);
        }
    }
};

const deletePost = e => {
    e.preventDefault();
};

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", updatePost);
