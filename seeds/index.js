const User = require("../models/User");

const newUser = {
    first_name: "kevin",
    last_name: "lacson",
    username: "kevlac",
    email: "lacsonky@gmail.com",
    password: "password",
};

const seedUser = async () => {
    await User.create(newUser);
};

seedUser();
