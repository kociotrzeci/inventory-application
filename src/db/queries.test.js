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
describe("database interface GET operations", () => {
  it("should return number of entities", async () => {
    const entieties = await queries.getAllInfo();
    expect(Number(entieties.booksCount)).toBe(21);
    expect(Number(entieties.authorsCount)).toBe(10);
    expect(Number(entieties.genresCount)).toBe(10);
  });
  it("should get all books", async () => {
    const books = await queries.getAllBooks();
    expect(Array.isArray(books)).toBe(true);
    expect(books).not.toBeNull();
    expect(books[0].id).toBe(1);
    expect(books[0].title).toBe("Crime and Punishment");
  });
  it("should get all authors", async () => {
    const authors = await queries.getAllAuthors();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors).not.toBeNull();
    expect(authors[0].name).toBe("Fiodor Dostojewski");
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
    expect(info.id).toBe(1);
    expect(info.quantity).toBe(12);
    expect(info.author.name).toBe("Fiodor Dostojewski");
    expect(info.genre.name).toBe("Classics");
    expect(info.author.id).toBe(1);
    expect(info.genre.id).toBe(10);
  });
  it("get author with his books", async () => {
    const info = await queries.getAuthorByID(1);
    expect(info).not.toBeNull();
    expect(Array.isArray(info.titles)).toBe(true);
    expect(info.name).toBe("Fiodor Dostojewski");
    expect(info.titles[0].title).toBe("Crime and Punishment");
  });
  it("get genres books", async () => {
    const info = await queries.getGenreByID(1);
    expect(info).not.toBeNull();
    expect(Array.isArray(info.titles)).toBe(true);
    expect(info.name).toBe("Romance");
    expect(info.titles[0].title).toBe("Pride and Prejudice");
  });
});
describe("database interface UPDATE operations", () => {
  it("updates book", async () => {
    await queries.updateBook({
      id: 1,
      title: "Added title",
      author: "Victor Hugo",
      genre: "Romance",
      quantity: 123,
    });
    const info = await queries.getBookByID(1);
    expect(info.title).toBe("Added title");
    expect(info.quantity).toBe(123);
    expect(info.author.name).toBe("Victor Hugo");
    expect(info.genre.name).toBe("Romance");
  });

  it("updates author", async () => {
    await queries.updateAuthor({
      id: "1",
      name: "Updated Name",
    });
    const info = await queries.getAuthorByID(1);
    expect(info.name).toBe("Updated Name");
  });
  it("updates genre", async () => {
    await queries.updateGenre({
      id: "2",
      name: "Updated Genre",
    });
    const info = await queries.getGenreByID(2);
    expect(info.name).toBe("Updated Genre");
  });
});
describe("database interface INSERT operations", () => {
  it("adds new book", async () => {
    await queries.addBook({
      title: "Added title",
      author: "Victor Hugo",
      genre: "Romance",
      quantity: 123,
    });
    const info = await queries.getBookByID(22);
    expect(info.title).toBe("Added title");
    expect(info.quantity).toBe(123);
    expect(info.author.name).toBe("Victor Hugo");
    expect(info.genre.name).toBe("Romance");
  });
  it("adds new author", async () => {
    await queries.addAuthor({
      name: "Added Author",
    });
    const info = await queries.getAuthorByID(11);
    expect(info.name).toBe("Added Author");
  });
  it("adds new genre", async () => {
    await queries.addGenre({
      name: "Added Gemre",
    });
    const info = await queries.getGenreByID(11);
    expect(info.name).toBe("Added Gemre");
  });
});
