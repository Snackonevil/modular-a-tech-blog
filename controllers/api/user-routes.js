const User = require("../../models/User");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create User
router.post("/new-user", async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        });
        res.status(200).json({ message: "You account has been created" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({
                message: "Incorrect email",
            });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect password",
            });
            return;
        }

        // Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({
                user: dbUserData,
                message: "You are now logged in!",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
