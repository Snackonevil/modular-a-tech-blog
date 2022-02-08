const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// desc: home view, redirects to login page if not loggedin
// GET /
router.get("/", withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [
                { model: User, attributes: ["username"] },
                { model: Comment, attributes: ["comment_body", "user_id"] },
            ],
            order: [["createdAt", "DESC"]],
        });
        const posts = allPosts.map(post => post.get({ plain: true }));
        res.render("home", {
            loggedIn: req.session.loggedIn,
            userData: req.session.userData,
            posts,
        });
        return;
    } catch (err) {
        console.log(err);
    }
});

// desc: dashboard view
// GET /dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    const allPosts = await Post.findAll({
        where: {
            user_id: req.session.userData.id,
        },
        attributes: {
            exclude: ["user_id"],
        },
        order: [["createdAt", "DESC"]],
    });
    const posts = allPosts.map(post => post.get({ plain: true }));
    res.render("dashboard", {
        loggedIn: req.session.loggedIn,
        userData: req.session.userData,
        posts,
    });
});

// desc: create post form
// GET /newpost
router.get("/new-post", withAuth, (req, res) => {
    res.render("postForm");
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

// desc: get user by username and render profile
// GET /:user
router.get("/:user", (req, res) => {
    res.render("profile", {
        user: req.params.user,
        loggedIn: req.session.loggedIn,
    });
});

module.exports = router;
