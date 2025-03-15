const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function booksGet(req, res, next) {
  try {
    const books = await queries.getAllBooks();
    res.render("books", { books: books });
  } catch (error) {
    next(error);
  }
}
async function bookGet(req, res, next) {
  try {
    const ID = req.params.id;
    const book = await queries.getBookByID(ID);
    res.render("book", { book: book });
  } catch (error) {
    next(error);
  }
}

async function bookEditGet(req, res, next) {
  try {
    const ID = req.params.id;
    const book = await queries.getBookByID(ID);
    const genres = await queries.getAllGenres();
    res.render("bookEdit", { book: book, genres: genres });
  } catch (error) {
    next(error);
  }
}

const validator = [
  body("title").trim().isLength({ min: 1, max: 100 }).escape(),
  body("author").trim().isLength({ min: 1, max: 100 }).escape(),
  body("genre").trim().isLength({ min: 1, max: 100 }).escape(),
  body("quantity").trim().isNumeric(),
];

async function bookEditPost(req, res, next) {
  try {
    const ID = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty) throw error("invalid input");
    const { title, author, genre, quantity } = req.body;
    await queries.updateBook({
      id: ID,
      title: title,
      author: author,
      genre: genre,
      quantity: quantity,
    });
    res.redirect("/book/" + ID);
    console.log(`edited book ${ID}: ${req.body.title} ${req.body.author}`);
  } catch (error) {
    next(error);
  }
}
async function bookAddGet(req, res, next) {
  const genres = await queries.getAllGenres();
  try {
    res.render("bookAdd", { book: {}, genres: genres });
  } catch (error) {
    next(error);
  }
}

async function bookAddPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) throw error("invalid input");
    const { title, author, genre, quantity } = req.body;
    const ID = await queries.addBook({
      title: title,
      author: author,
      genre: genre,
      quantity: quantity,
    });
    res.redirect("/book/" + ID);
    console.log(`added book ${ID}: ${req.body.title} ${req.body.author}`);
  } catch (error) {
    next(error);
  }
}

async function bookDelete(req, res, next) {
  const ID = req.params.id;
  const response = await queries.deleteBook(ID);
  res.redirect("/books");
}
module.exports = {
  booksGet,
  bookGet,
  bookEditGet,
  bookEditPost,
  bookAddGet,
  bookAddPost,
  bookDelete,
};
