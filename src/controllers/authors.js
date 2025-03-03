const queries = require("../db/queries");

async function authorsGET(req, res, next) {
  const authors = await queries.getAllAuthors();

  res.render("authors", { authors: authors });
}
async function authorGET(req, res, next) {
  try {
    const ID = req.params.id;
    const author = await queries.getAuthorByID(ID);
    res.render("author", { author: author });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorsGET,
  authorGET,
};
