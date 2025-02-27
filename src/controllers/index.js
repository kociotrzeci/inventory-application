const queries = require("../db/queries");

async function indexGET(req, res) {
  const index = await queries.getAllInfo();
  res.render("index", { index: index });
}

module.exports = {
  indexGET,
};
