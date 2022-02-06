const router = require("express").Router();

// let loggedIn = false;

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
router.get("/dashboard", (req, res) => {
    if (req.session.loggedIn) {
        res.render("dashboard", {
            loggedIn: req.session.loggedIn,
            userData: req.session.userData,
        });
        return;
    } else {
        res.redirect("/login");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/new-user", (req, res) => {
    res.render("newUser");
});

module.exports = router;
