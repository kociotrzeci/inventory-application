const { Router } = require("express");

const index = require("../controllers/index");
const books = require("../controllers/books");
const authors = require("../controllers/authors");
const router = Router();
router.get("/", index.indexGET);
router.get("/books", books.booksGET);
router.get("/books/:id", books.bookGET);
router.get("/authors", authors.authorsGET);
router.get("/authors/:id", authors.authorGET);
module.exports = { router };
