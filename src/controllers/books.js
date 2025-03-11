const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function booksGET(req, res, next) {
  try {
    const books = await queries.getAllBooks();
    res.render("books", { books: books });
  } catch (error) {
    next(error);
  }
}
async function bookGET(req, res, next) {
  try {
    const ID = req.params.id;
    const book = await queries.getBookByID(ID);
    res.render("book", { book: book });
  } catch (error) {
    next(error);
  }
}

async function bookEDIT(req, res, next) {
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

async function bookEDITpost(req, res, next) {
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
    res.redirect("/books/" + ID);
    console.log(`edited book ${ID}: ${req.body.title} ${req.body.author}`);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  booksGET,
  bookGET,
  bookEDIT,
  bookEDITpost,
};
