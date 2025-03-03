const { Router } = require("express");

const index = require("../controllers/index");
const books = require("../controllers/books");
const authors = require("../controllers/authors");
const genres = require("../controllers/genres");
const router = Router();
router.get("/", index.indexGET);
router.get("/books", books.booksGET);
router.get("/books/:id", books.bookGET);
router.get("/authors", authors.authorsGET);
router.get("/authors/:id", authors.authorGET);
router.get("/genres", genres.genresGET);
router.get("/genres/:id", genres.genreGET);

router.use((err, req, res, next) => {
  console.error("Error occurred: ", err);
  if (err.message != "AggregateError") {
    return res.status(404).send(err.message);
  }
  // Handle other errors
  res.status(500).send("Erorr 500");
});

module.exports = { router };
