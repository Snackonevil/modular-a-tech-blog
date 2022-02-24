const goToPostForm = () => {
    location.href = "./post-form";
    return;
};

const updateRedirect = async e => {
    e.preventDefault();
    let postId = e.target.getAttribute("data-post");
    location.href = `/update-post?post=${postId}`;
};

let editBtns = document.querySelectorAll(".editBtn");
editBtns.forEach(btn => btn.addEventListener("click", updateRedirect));
