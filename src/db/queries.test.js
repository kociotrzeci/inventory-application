const queries = require("./queries.js");
const { populateDB } = require("./populateDB.js");
const { dropDB } = require("./dropDB.js");

beforeAll(async () => {
  await dropDB();
  await populateDB();
});

afterAll(async () => {
  await queries.stopPool();
});

describe("database interface", () => {
  it("should return number of entities", async () => {
    const entieties = await queries.getAllInfo();
    expect(Number(entieties.booksCount)).toBe(22);
    expect(Number(entieties.authorsCount)).toBe(10);
    expect(Number(entieties.genresCount)).toBe(10);
  });
  it("should get all books", async () => {
    const books = await queries.getAllBooks();
    books.forEach((book) => {
      console.log(book);
    });
    expect(Array.isArray(books)).toBe(true);
    expect(books).not.toBeNull();
    expect(books[0].id).toBe(1);
    expect(books[0].title).toBe("Crime and Punishment");
  });
  it("should get all authors", async () => {
    const authors = await queries.getAllAuthors();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors).not.toBeNull();
  });

  it("should get all genres", async () => {
    const genres = await queries.getAllGenres();
    expect(Array.isArray(genres)).toBe(true);
    expect(genres).not.toBeNull();
  });
  it("get single book info", async () => {
    const info = await queries.getBookByID(1);
    expect(info).not.toBeNull();
    expect(info.title).toBe("Crime and Punishment");
    expect(info.quantity).toBe(12);
    expect(info.author.name).toBe("Fiodor Dostojewski");
    expect(info.genre.name).toBe("Classics");
    expect(info.author.id).toBe(1);
    expect(info.genre.id).toBe(10);
  });
  it("get author with his books", async () => {
    const info = await queries.getAuthorByID(1);
    expect(info).not.toBeNull();
    expect(Array.isArray(info.title)).toBe(true);
    expect(info.name).toBe("Fiodor Dostojewski");
  });
  it("get genres books", async () => {
    const info = await queries.getGenreByID(1);
    expect(info).not.toBeNull();
    expect(Array.isArray(info.title)).toBe(true);
    expect(info.name).toBe("Romance");
  });
});
