const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/new-user", (req, res) => {
    res.render("newUser");
});

module.exports = router;
