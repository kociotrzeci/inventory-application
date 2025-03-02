const express = require("express");
const app = express();
const path = require("node:path");
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });
const viewsPath = path.join(__dirname, "views");
const { router } = require("./routers/router.js");

app.set("views", viewsPath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
});
