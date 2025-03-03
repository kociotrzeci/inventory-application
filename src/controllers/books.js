const queries = require("../db/queries");

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

module.exports = {
  booksGET,
  bookGET,
};
