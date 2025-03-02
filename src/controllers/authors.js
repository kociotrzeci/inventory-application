const queries = require("../db/queries");

async function authorsGET(req, res) {
  const authors = await queries.getAllAuthors();
  res.render("authors", { authors: authors });
  console.log("/authors");
  console.log(authors);
}
async function authorGET(req, res) {
  const ID = req.params.id;
  const author = await queries.getAuthorByID(ID);
  res.render("author", { author: author });
}

module.exports = {
  authorsGET,
  authorGET,
};
