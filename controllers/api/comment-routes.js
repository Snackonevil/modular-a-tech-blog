const { Comment } = require("../../models");
const router = require("express").Router();

// desc: find all comments
// GET /api/comments

router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            attributes: {
                include: ["id", "comment_body", "user_id"],
            },
        });
        res.status(200).json(allComments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// desc: find comment by id
// GET /api/comments/:id
router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                include: ["id", "comment_body"],
            },
        });
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// desc: find comment by post id
// GET /api/comments/:post
router.get("/:post", async (req, res) => {
    try {
        const comment = Comment.findOne({
            where: {
                post_id: req.params.post,
            },
            attributes: {
                include: ["id", "comment_body"],
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// des: create comment
// POST /api/comments
router.post("/", async (req, res) => {
    try {
        const reqBody = {
            comment_body: req.body.comment_body,
            user_id: req.body.user_id, // will be user id from session
            post_id: req.body.post_id,
        };
        const newComment = await Comment.create(reqBody);
        res.status(201).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// desc: delete comment by id
// DELETE /api/comments/:id
router.delete("/:id", async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
