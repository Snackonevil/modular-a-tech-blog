const { User } = require("../../models");
const router = require("express").Router();

// desc: find user by Id
// GET api/users/:id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        user == null
            ? res
                  .status(404)
                  .json({ message: `User with Id ${req.params.id} not found` })
            : res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// desc: Create User
// POST api/users/
router.post("/", async (req, res) => {
    try {
        await User.create(req.body);
        const userData = await User.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ["password"] }, //don't return pk or pass
        });
        // req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userData = userData;
        // });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// desc: Login
// POST /api/users/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let messages = [];
        const dbUserData = await User.findOne({
            where: { email: email },
            atrributes: { exclude: ["password"] },
        });
        // If Empty fields, then push message to array
        if (email == "" || password == "") {
            messages.push("Empty fields");
        }
        // If user is not found, then push message to array
        if (!dbUserData) {
            messages.push("Account not found");
        }

        // Validate password if there is a user, push message if not
        if (dbUserData) {
            const validPassword = await dbUserData.checkPassword(password);
            if (!validPassword) {
                messages.push("Incorrect password");
            }
        }

        if (messages.length === 0) {
            // req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userData = dbUserData;
            // console.log(req.session);
            // });
            res.status(200).json({
                user: dbUserData,
                message: "You are now logged in!",
            });
        } else {
            res.send(JSON.stringify(messages));
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// desc: Logout DESTROYYYY
// POST /api/users/logout
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
