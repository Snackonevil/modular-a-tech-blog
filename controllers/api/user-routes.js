const User = require("../../models/User");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
});

router.post("/new-user", async (req, res) => {
    await User.create({
        username: req.body.username,
    });
    res.status(200).json({ msg: "created" });
});

module.exports = router;
