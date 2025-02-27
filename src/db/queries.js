const pool = require("./pool");

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
  try {
    const result = await pool.query("SELECT title FROM books");
    return result.rows;
  } catch (error) {
    console.error("Error quering DB: ", error);
    return null;
  }
}
async function getAllAuthors() {
  try {
    const result = await pool.query("SELECT name FROM authors");
    return result.rows;
  } catch (error) {
    console.error("Error querying authors: ", error);
    return null;
  }
}

async function getAllGenres() {
  try {
    const result = await pool.query("SELECT name FROM genres");
    return result.rows;
  } catch (error) {
    console.error("Error querying genres: ", error);
    return null;
  }
}

async function getBookByID(id) {
  try {
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
    return {
      title: book.rows[0].title,
      quantity: book.rows[0].quantity,
      author: { name: author.rows[0].name, id: author.rows[0].id },
      genre: { name: genre.rows[0].name, id: genre.rows[0].id },
    };
  } catch (error) {
    console.error("Error querying genres: ", error);
    return null;
  }
}

async function getAuthorByID(id) {
  try {
    const [book, author] = await Promise.all([
      pool.query("SELECT title FROM books WHERE author_id=$1", [id]),
      pool.query("SELECT name FROM authors WHERE id=$1", [id]),
    ]);
    return {
      title: book.rows[0],
      name: author.rows[0].name,
    };
  } catch (error) {
    console.error("Error querying genres: ", error);
    return null;
  }
}
async function getGenreByID(id) {
  return await pool.query("SELECT * FROM books WHERE id=$1"[id]);
}
module.exports = {
  stopPool,
  getAllInfo,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  getBookByID,
  getAuthorByID,
};
