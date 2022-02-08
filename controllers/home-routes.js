const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// desc: home view, redirects to login page if not loggedin
// GET /
router.get("/", withAuth, (req, res) => {
    res.render("home", {
        loggedIn: req.session.loggedIn,
        userData: req.session.userData,
    });
    return;
});

// desc: dashboard view
// GET /dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    const allPosts = await Post.findAll({
        where: {
            user_id: req.session.userData.id,
        },
        attributes: {
            exclude: ["id", "user_id"],
        },
    });
    const posts = allPosts.map(post => post.get({ plain: true }));
    res.render("dashboard", {
        loggedIn: req.session.loggedIn,
        userData: req.session.userData,
        posts,
    });
});

// desc: login view
// GET /login
router.get("/login", (req, res) => {
    res.render("login");
});

// desc: create new user view
// GET /new-user
router.get("/new-user", (req, res) => {
    res.render("newUser");
});

module.exports = router;
