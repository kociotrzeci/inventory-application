const queries = require("../db/queries");

async function genresGET(req, res) {
  const genres = await queries.getAllGenres();
  res.render("genres", { genres: genres });
}
async function genreGET(req, res) {
  const ID = req.params.id;
  const genre = await queries.getGenreByID(ID);
  res.render("genre", { genre: genre });
}

module.exports = {
  genresGET,
  genreGET,
};
