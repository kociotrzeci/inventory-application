const queries = require("../db/queries");

async function genresGET(req, res, next) {
  try {
    const genres = await queries.getAllGenres();
    res.render("genres", { genres: genres });
  } catch (error) {
    next(error);
  }
}
async function genreGET(req, res, next) {
  try {
    const ID = req.params.id;
    const genre = await queries.getGenreByID(ID);
    res.render("genre", { genre: genre });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  genresGET,
  genreGET,
};
