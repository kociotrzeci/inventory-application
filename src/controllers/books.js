const queries = require("../db/queries");

async function booksGET(req, res) {
  console.log("i am here");
  const books = await queries.getAllBooks();
  res.render("books", { books: books });
}

module.exports = {
  booksGET,
};
