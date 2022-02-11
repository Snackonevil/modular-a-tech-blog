const title = document.getElementById("postTitle");
const body = document.getElementById("postBody");

const populatePostForm = async () => {
    const postId = new URLSearchParams(window.location.search).get("post");
    const response = await fetch(`api/posts/${postId}`);
    const data = await response.json();
    title.value = data.post_title;
    body.value = data.post_body;
};

window.addEventListener("load", e => {
    populatePostForm();
});

const updatePost = e => {
    e.preventDefault();
};

const deletePost = e => {
    e.preventDefault();
};
