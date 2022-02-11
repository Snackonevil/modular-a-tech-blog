const router = require("express").Router();

const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");

const postViews = require("./post-views");

router.use("/", homeRoutes);
router.use("/posts", postViews);
router.use("/api", apiRoutes);

module.exports = router;
