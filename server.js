const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// helpers
require("dotenv").config();

// Database Connection and store
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize app
const app = express();
const PORT = process.env.PORT;

// Session
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 3600 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

// Establish view engine
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Connect
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
});
