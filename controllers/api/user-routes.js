const User = require("../../models/User");
const router = require("express").Router();

// desc: find user by Id
// GET api/users/:id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// desc: Create User
// POST api/users/
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// desc: Login
// POST /api/uses/login
router.post("/login", async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({
                message: "Account not found",
            });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Account not found",
            });
            return;
        }

        // Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userData = dbUserData;

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

// desc: Logout DESTROYYYY
// POST /api/uses/logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
