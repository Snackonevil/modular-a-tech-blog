const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/:post", async (req, res) => {
    try {
        const data = await Post.findOne({
            where: {
                id: req.params.post,
            },
            include: [{ model: User }],
        });
        const post = data.get({ plain: true });
        console.log(post);
        res.render("post", {
            post,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
