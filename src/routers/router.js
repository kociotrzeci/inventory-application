const { Router } = require("express");

const index = require("../controllers/index");
const books = require("../controllers/books");
const authors = require("../controllers/authors");
const genres = require("../controllers/genres");
const router = Router();

router.get("/", index.indexGET);
router.get("/books", books.booksGet);
router.get("/book/:id", books.bookGet);
router.get("/book/:id/edit", books.bookEditGet);
router.post("/book/:id/edit", books.bookEditPost);
router.get("/books/add", books.bookAddGet);
router.post("/books/add", books.bookAddPost);
router.post("/book/:id/delete", books.bookDelete);

router.get("/authors", authors.authorsGet);
router.get("/authors/:id", authors.authorGet);
router.get("/author/add", authors.authorAddGet);
router.post("/author/add", authors.authorAddPost);
router.get("/authors/:id/edit", authors.authorEditGet);
router.post("/authors/:id/edit", authors.authorEditPost);
router.post("/authors/:id/delete", authors.authorDeletePost);

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
