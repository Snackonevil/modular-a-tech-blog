const { User, Post, Comment } = require("../../models");
const router = require("express").Router();

// desc: find all posts
// GET /api/posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, attributes: ["username"] },
                {
                    model: Comment,
                    attributes: ["comment_body", "user_id"],
                    include: [{ model: User, attributes: ["username"] }],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// desc: find post by id
// GET /api/posts/:id
router.get("/:id", async (req, res) => {
    try {
        console.log(req.session.userData.id);
        const post = await Post.findByPk(req.params.id, {
            where: {
                user_id: req.session.userData.id,
            },
        });
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// desc: find post by user
// GET /api/posts/user
router.get("/user/:id", async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                user_id: req.params.id,
            },
        });
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// desc: create post
// POST /api/posts
router.post("/", async (req, res) => {
    const reqBody = {
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.session.userData.id,
    };
    const newPost = await Post.create(reqBody);
    res.status(201).json({ message: "Post created" });
});

// desc: update post
// PUT /api/posts/:id
router.put("/:id", async (req, res) => {
    try {
        const updated = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// desc: delete post
// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.userData.id,
        },
    });
    res.status(200).json({ message: "Post Deleted" });
});

module.exports = router;
