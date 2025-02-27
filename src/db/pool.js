const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
module.exports = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.POSTGRES_DB,
  password: process.env.PGPASSWORD,
  port: 5432,
});
