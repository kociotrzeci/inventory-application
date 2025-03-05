const { response } = require("express");
const pool = require("./pool");

// ------ GET -------
async function stopPool() {
  pool.end();
}

async function getAllInfo() {
  const [booksCount, authorsCount, genresCount] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM books"),
    pool.query("SELECT COUNT(*) FROM authors"),
    pool.query("SELECT COUNT(*) FROM genres"),
  ]);

  return {
    booksCount: booksCount.rows[0].count,
    authorsCount: authorsCount.rows[0].count,
    genresCount: genresCount.rows[0].count,
  };
}

async function getAllBooks() {
  const result = await pool.query("SELECT title, ID FROM books");
  const response = result.rows.map((row) => ({
    title: row.title,
    id: row.id,
  }));
  return response;
}
async function getAllAuthors() {
  const result = await pool.query("SELECT name, ID FROM authors");
  const response = result.rows.map((row) => ({
    name: row.name,
    id: row.id,
  }));
  return response;
}

async function getAllGenres() {
  const result = await pool.query("SELECT name, ID FROM genres");
  const response = result.rows.map((row) => ({
    name: row.name,
    id: row.id,
  }));
  return response;
}

async function getBookByID(id) {
  const [book, author, genre] = await Promise.all([
    pool.query("SELECT title, quantity FROM books WHERE id=$1", [id]),
    pool.query(
      "SELECT name, id FROM authors WHERE id=(SELECT author_id FROM books WHERE id=$1)",
      [id]
    ),
    pool.query(
      "SELECT name, id FROM genres WHERE id=(SELECT genre_id FROM books WHERE id=$1)",
      [id]
    ),
  ]);
  if (book.rows.length === 0) {
    throw new Error("No data found for the given book ID");
  }
  return {
    title: book.rows[0].title,
    id: id,
    quantity: book.rows[0].quantity,
    author: { name: author.rows[0].name, id: author.rows[0].id },
    genre: { name: genre.rows[0].name, id: genre.rows[0].id },
  };
}

async function getAuthorByID(id) {
  const [book, author] = await Promise.all([
    pool.query("SELECT title, id FROM books WHERE author_id=$1", [id]),
    pool.query("SELECT name FROM authors WHERE id=$1", [id]),
  ]);
  if (author.rows.length === 0) {
    throw new Error("No data found for the given author ID");
  }
  const titles = book.rows.map((row) => ({ title: row.title, id: row.id }));
  return {
    titles: titles,
    name: author.rows[0].name,
  };
}

async function getGenreByID(id) {
  const [book, genre] = await Promise.all([
    pool.query("SELECT title, id FROM books WHERE genre_id=$1", [id]),
    pool.query("SELECT name FROM genres WHERE id=$1", [id]),
  ]);
  const titles = book.rows.map((row) => ({ title: row.title, id: row.id }));
  return {
    titles: titles,
    name: genre.rows[0].name,
  };
}
// ------ UPDATE ---------
async function updateBook(book) {
  const [author, genre] = await Promise.all([
    pool.query("SELECT id FROM authors WHERE name=$1", [book.author]),
    pool.query("SELECT id FROM genres WHERE name=$1", [book.genre]),
  ]);
  if (author.rows.length === 0) {
    throw new Error("No such author");
  }
  if (genre.rows.length === 0) {
    throw new Error("No such genre");
  }
  const authorID = author.rows[0].id;
  const genreID = genre.rows[0].id;
  const response = await pool.query(
    "UPDATE books SET title = $2, author_id = $3, quantity = $4, genre_id = $5  WHERE id=$1",
    [book.id, book.title, authorID, book.quantity, genreID]
  );
  return response;
}

async function updateAuthor(author) {
  const response = await pool.query(
    "UPDATE authors SET name = $2  WHERE id=$1",
    [author.id, author.name]
  );
  return response;
}

async function updateGenre(genre) {
  const response = await pool.query(
    "UPDATE genres SET name = $2  WHERE id=$1",
    [genre.id, genre.name]
  );
  return response;
}

// ------- ADD ------
async function addBook(book) {
  const [author, genre] = await Promise.all([
    pool.query("SELECT id FROM authors WHERE name=$1", [book.author]),
    pool.query("SELECT id FROM genres WHERE name=$1", [book.genre]),
  ]);
  if (author.rows.length === 0) {
    throw new Error("No such author");
  }
  if (genre.rows.length === 0) {
    throw new Error("No such genre");
  }
  const authorID = author.rows[0].id;
  const genreID = genre.rows[0].id;
  const response = await pool.query(
    `
      INSERT INTO books (title, author_id, quantity, genre_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [book.title, authorID, book.quantity, genreID]
  );
  return response;
}
async function addAuthor(author) {
  const response = await pool.query(
    `
    INSERT INTO authors (name)
    VALUES ($1)
    RETURNING *;
    `,
    [author.name]
  );
  return response;
}
async function addGenre(genre) {
  const response = await pool.query(
    `
    INSERT INTO genres (name)
    VALUES ($1)
    RETURNING *;
    `,
    [genre.name]
  );
  return response;
}

module.exports = {
  stopPool,
  getAllInfo,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  getBookByID,
  getAuthorByID,
  getGenreByID,
  updateBook,
  addBook,
  updateAuthor,
  addAuthor,
  updateGenre,
  addGenre,
};
