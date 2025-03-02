const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS genres(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS books(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(100),
  author_id INTEGER,
  genre_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO authors (name) VALUES
('Fiodor Dostojewski'),
('Henryk Sienkiewicz'),
('Jane Austen'),
('Charles Dickens'),
('Victor Hugo'),
('Jules Verne'),
('Ernest Hemingway'),
('John Grisham'),
('Danielle Steel'),
('Sidney Sheldon');

INSERT INTO genres (name) VALUES
('Romance'),
('Science Fiction'),
('Fantasy'),
('Mystery'),
('Thriller'),
('Horror'),
('Historical Fiction'),
('Crime'),
('Adventure'),
('Classics');

INSERT INTO books (title, author_id, genre_id, quantity) VALUES
('Crime and Punishment', 1, 10, 12),
('Quo Vadis', 2, 7, 0),
('Pride and Prejudice', 3, 1, 21),
('Oliver Twist', 4, 10, 53),
('Les Misérables', 5, 7, 63),
('Twenty Thousand Leagues Under the Sea', 6, 2, 3),
('The Old Man and the Sea', 7, 10, 9),
('The Firm', 8, 5, 0),
('Jewels', 9, 1, 0),
('Master of the Game', 10, 5, 0),
('David Copperfield', 4, 10, 7),
('Journey to the Centre of the Earth', 6, 2, 15),
('A Farewell to Arms', 7, 10, 13),
('The Pelican Brief', 8, 5, 18),
('Mixed Blessings', 9, 1, 8),
('Rage of Angels', 10, 5, 4),
('Great Expectations', 4, 10, 20),
('Around the World in Eighty Days', 6, 2, 14),
('To Have and Have Not', 7, 10, 17),
('The Brothers Karamazov', 1, 10, 2),
('The Client', 8, 5, 2);
`;

async function populateDB() {
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
module.exports = { populateDB };
