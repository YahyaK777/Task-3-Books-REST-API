const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// In-memory sample data. Data resets when the server restarts.
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" },
  { id: 3, title: "Atomic Habits", author: "James Clear" }
];

let nextId = 4;

// Welcome route.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Books REST API",
    endpoints: {
      getAllBooks: "GET /books",
      getBookById: "GET /books/:id",
      addBook: "POST /books",
      updateBook: "PUT /books/:id",
      deleteBook: "DELETE /books/:id"
    }
  });
});

// Get all books.
app.get("/books", (req, res) => {
  res.status(200).json({
    count: books.length,
    books: books
  });
});

// Get one book by ID.
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: "Book ID must be a positive number." });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  res.status(200).json(book);
});

// Add a new book.
app.post("/books", (req, res) => {
  const { title, author } = req.body || {};

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Both title and author are required as non-empty strings."
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);
  res.status(201).json({
    message: "Book added successfully.",
    book: newBook
  });
});

// Update a book by ID.
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: "Book ID must be a positive number." });
  }

  const { title, author } = req.body || {};

  if (typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim()) {
    return res.status(400).json({
      message: "Both title and author are required to update a book."
    });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  book.title = title.trim();
  book.author = author.trim();

  res.status(200).json({
    message: "Book updated successfully.",
    book: book
  });
});

// Delete a book by ID.
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: "Book ID must be a positive number." });
  }

  const bookIndex = books.findIndex((item) => item.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found." });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({
    message: "Book deleted successfully.",
    book: deletedBook
  });
});

// Handle invalid JSON and other request errors.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON request body." });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Books REST API is running at http://localhost:${PORT}`);
});