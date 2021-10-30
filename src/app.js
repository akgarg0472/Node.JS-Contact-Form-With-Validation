const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");
const PORT = process.env.PORT || 8080;
const WebsiteMainRouter = require("./routers/WebsiteMainRouter");
require("./db/connection");

// main express app
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// static resource configs
const STATIC_RESOURCES_PATH = path.resolve(path.join(__dirname), "../public");
app.use(express.static(STATIC_RESOURCES_PATH));

// routing configs
app.use(WebsiteMainRouter);

// view engine related configs
const VIEWS_PATH = path.join(path.resolve(__dirname), "../views/pages");
const PARTIALS_PATH = path.join(path.resolve(__dirname), "../views/partials");
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

app.listen(PORT, () => {
  console.log(chalk.bgWhiteBright.black(`Listening on port ${PORT}`));
});
