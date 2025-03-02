const queries = require("../db/queries");

async function booksGET(req, res) {
  const books = await queries.getAllBooks();
  res.render("books", { books: books });
}
async function bookGET(req, res) {
  const ID = req.params.id;
  const book = await queries.getBookByID(ID);
  res.render("book", { book: book });
}

module.exports = {
  booksGET,
  bookGET,
};
