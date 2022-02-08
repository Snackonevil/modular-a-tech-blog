const { Post } = require("../models");
const User = require("../models/User");

const newUser = {
    first_name: "kevin",
    last_name: "lacson",
    username: "kevlac",
    email: "lacsonky@gmail.com",
    password: "password",
};

const post = {
    post_title: "Post TWO",
    post_body: "this is the body of post one for testing purposes",
    user_id: 3,
};

const seedUser = async () => {
    await User.create(newUser);
};

const seedPosts = async () => {
    await Post.create(post);
};
// seedUser();
seedPosts();
