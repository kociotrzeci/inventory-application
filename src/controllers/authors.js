const queries = require("../db/queries");

async function authorsGet(req, res, next) {
  try {
    const authors = await queries.getAllAuthors();
    res.render("authors", { authors: authors });
  } catch (error) {
    next(error);
  }
}
async function authorGet(req, res, next) {
  try {
    const ID = req.params.id;
    const author = await queries.getAuthorByID(ID);
    res.render("author", { author: author });
  } catch (error) {
    next(error);
  }
}

async function authorDeletePost(req, res, next) {
  try {
    const response = await queries.deleteAuthor(req.params.id);
  } catch (error) {
    next(error);
  }
  res.redirect("/authors");
}
module.exports = {
  authorsGet,
  authorGet,
  authorDeletePost,
};
