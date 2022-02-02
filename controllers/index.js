const router = require("express").Router();

const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.render("home");
});
router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
