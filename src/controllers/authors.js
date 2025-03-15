const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
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

async function authorAddGet(req, res, next) {
  const genres = await queries.getAllGenres();
  try {
    res.render("authorAdd", { book: {}, genres: genres });
  } catch (error) {
    next(error);
  }
}

const validator = [body("name").trim().isLength({ min: 1, max: 100 }).escape()];

async function authorAddPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) throw error("invalid input");
    const ID = await queries.addAuthor({ name: req.body.name });
    res.redirect("/authors/" + ID);
    console.log(`added author ${ID}: ${req.body.name}`);
  } catch (error) {
    next(error);
  }
}
async function authorEditGet(req, res, next) {
  try {
    const ID = req.params.id;
    const author = await queries.getAuthorByID(ID);
    res.render("authorEdit", { author: author });
  } catch (error) {
    next(error);
  }
}
async function authorEditPost(req, res, next) {
  try {
    const ID = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty) throw new Error("invalid input");
    const name = req.body.name;
    console.log(name);
    await queries.updateAuthor({ name: name, id: ID });
    res.redirect("/authors/" + ID);
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
  authorAddGet,
  authorAddPost,
  authorEditGet,
  authorEditPost,
  authorDeletePost,
};
