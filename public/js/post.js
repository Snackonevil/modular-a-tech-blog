const goToPostForm = () => {
    location.href = "./post-form";
    return;
};

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
    }
    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    }
};

let updateBtns = document.querySelectorAll(".updateBtn");

const updateRedirect = async e => {
    e.preventDefault();
    let postId = e.target.getAttribute("data-post");
    location.href = `/update-post?post=${postId}`;
};

updateBtns.forEach(btn => btn.addEventListener("click", updateRedirect));

// document.getElementById("#createPost").addEventListener("click", createPost);
// document.querySelectorAll(".updatePost").addEventListener("click", updatePost);
// document.getElementById("#deletePost").addEventListener("click", deletePost);
