const { Router } = require("express");

const { indexGET } = require("../controllers/index");
const { booksGET, bookGET } = require("../controllers/books");
const router = Router();
router.get("/", indexGET);
router.get("/books", booksGET);
router.get("/books/:id", bookGET);
module.exports = { router };
