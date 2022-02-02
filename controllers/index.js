const router = require("express").Router();

const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.render("home");
});

module.exports = router;
