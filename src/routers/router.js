const { Router } = require("express");

const { indexGET } = require("../controllers/index");
const { booksGET } = require("../controllers/books");
const router = Router();
router.get("/", indexGET);
router.get("/books", booksGET);
module.exports = { router };
