const { User, Post, Comment } = require("../models");

const userData = {
    first_name: "Kevin",
    last_name: "Lacson",
    username: "snackonevil",
    email: "lacsonky@gmail.com",
    password: "rararara",
};

const postData = {
    post_title: "My First Post",
    post_body: "this is the body of post one for testing purposes",
    user_id: 1,
};

const commentData = {
    comment_body: "Wow this is a great post",
    user_id: 1,
    post_id: 1,
};

const seed = async () => {
    await User.create(userData);
    await Post.create(postData);
    await Comment.create(commentData);
};

seed();
