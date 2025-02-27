const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const SQL = `
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS authors;
`;

async function dropDB() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
module.exports = { dropDB };
