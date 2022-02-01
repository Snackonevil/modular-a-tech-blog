const path = require("path");
const express = require("express");
// session
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// helpers
require("dotenv").config();

const sequelize = require("./config/connection");
// sequelize store?

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
});
