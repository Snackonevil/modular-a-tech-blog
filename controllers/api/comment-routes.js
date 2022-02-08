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

// desc: find comment by post
// GET /api/comments

// desc: delete comment by id
// DELETE /api/comments

module.exports = router;
