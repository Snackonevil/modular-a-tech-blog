const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// desc: home view, redirects to login page if not loggedin
// GET /
router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.render("home", {
            loggedIn: req.session.loggedIn,
            userData: req.session.userData,
        });
        return;
    } else {
        res.redirect("/login");
    }
});

// desc: dashboard view
// GET /dashboard
router.get("/dashboard", async (req, res) => {
    if (req.session.loggedIn) {
        const posts = await Post.findAll({
            where: {
                user_id: req.session.userData.id,
            },
            attributes: {
                exclude: ["id", "user_id"],
            },
        });
        const postMap = posts.map(post => post.get({ plain: true }));
        res.render("dashboard", {
            loggedIn: req.session.loggedIn,
            userData: req.session.userData,
            postMap,
        });
        return;
    } else {
        res.redirect("/login");
    }
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
