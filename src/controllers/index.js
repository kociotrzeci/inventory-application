const queries = require("../db/queries");

async function indexGET(req, res, next) {
  try {
    const index = await queries.getAllInfo();
    res.render("index", { index: index });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexGET,
};
