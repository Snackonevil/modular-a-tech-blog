const { User, Post, Comment } = require("../models");

const newUser = {
    first_name: "kevin",
    last_name: "lacson",
    username: "snackonevil",
    email: "lacsonky@gmail.com",
    password: "rararara",
};

const post = {
    post_title: "Post TWO",
    post_body: "this is the body of post one for testing purposes",
    user_id: 1,
};

const comment = {
    comment_body: "Wow this is a great post",
    user_id: 1,
    post_id: 1,
};

const seed = async () => {
    await User.create(newUser);
    await Post.create(post);
    await Comment.create(comment);
};

seed();
