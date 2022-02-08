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
    console.log(reqBody);
    // await fetch("/api/posts", {
    //     method: "POST",
    //     body: reqBody,
    //     headers: { "Content-Type": "application/json" },
    // });
};

document.querySelector("button").addEventListener("click", createPost);
