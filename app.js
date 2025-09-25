const express = require('express');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
// This allows Express to read JSON data sent in POST, PUT, PATCH requests
app.use(express.json());

// In-memory "database" for our books
// In a real application, this would be a persistent database (e.g., PostgreSQL, MongoDB)
let books = [
  {
    id: uuidv4(),
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publicationYear: 1954,
  },
  {
    id: uuidv4(),
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publicationYear: 1813,
  },
  {
    id: uuidv4(),
    title: '1984',
    author: 'George Orwell',
    publicationYear: 1949,
  },
];

// --- API Endpoints ---

// GET /api/books - Get all books
// Returns a list of all books in our collection.
app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// GET /api/books/:id - Get a single book by ID
// Retrieves a specific book using its unique ID from the URL parameters.
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  const book = books.find((b) => b.id === id); // Find the book in our 'database'

  if (!book) {
    // If no book is found, return a 404 Not Found error
    return res.status(404).json({ message: `Book with ID '${id}' not found.` });
  }

  // If found, return the book with a 200 OK status
  res.status(200).json(book);
});

// POST /api/books - Create a new book
// Adds a new book to the collection based on data provided in the request body.
app.post('/api/books', (req, res) => {
  const { title, author, publicationYear } = req.body; // Extract data from the request body

  // Basic validation: ensure title and author are provided
  if (!title || !author) {
    return res
      .status(400) // 400 Bad Request if essential data is missing
      .json({ message: 'Title and author are required fields.' });
  }

  // Create a new book object with a unique ID
  const newBook = {
    id: uuidv4(), // Generate a unique ID for the new book
    title,
    author,
    publicationYear: publicationYear || null, // Allow publicationYear to be optional
  };

  books.push(newBook); // Add the new book to our in-memory array
  res.status(201).json(newBook); // 201 Created: Indicates successful resource creation
});

// PUT /api/books/:id - Update a book (full replacement)
// Replaces an entire book's data identified by its ID with the new data from the request body.
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const { title, author, publicationYear } = req.body; // Get new data from the request body

  // Basic validation for the replacement data
  if (!title || !author) {
    return res
      .status(400)
      .json({ message: 'Title and author are required fields for PUT.' });
  }

  const bookIndex = books.findIndex((b) => b.id === id); // Find the index of the book to be updated

  if (bookIndex === -1) {
    // If book not found, return 404 Not Found
    return res
      .status(404)
      .json({ message: `Book with ID '${id}' not found for update.` });
  }

  // Create an updated book object, keeping the original ID
  const updatedBook = {
    id, // Keep the existing ID
    title,
    author,
    publicationYear: publicationYear || null,
  };

  books[bookIndex] = updatedBook; // Replace the old book with the updated one
  res.status(200).json(updatedBook); // 200 OK: Indicates successful update
});

// PATCH /api/books/:id - Partially update a book
// Modifies only the specified fields of an existing book.
app.patch('/api/books/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const updates = req.body; // Get partial update data from the request body

  const bookIndex = books.findIndex((b) => b.id === id); // Find the index of the book to be updated

  if (bookIndex === -1) {
    // If book not found, return 404 Not Found
    return res
      .status(404)
      .json({ message: `Book with ID '${id}' not found for partial update.` });
  }

  // Apply updates: use spread operator to merge existing book data with new updates
  books[bookIndex] = { ...books[bookIndex], ...updates };

  res.status(200).json(books[bookIndex]); // 200 OK: Return the updated book
});

// DELETE /api/books/:id - Delete a book
// Removes a book from the collection identified by its ID.
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the URL

  const initialLength = books.length; // Store initial length to check if a book was actually removed
  books = books.filter((b) => b.id !== id); // Filter out the book to be deleted

  if (books.length === initialLength) {
    // If no book was removed (length didn't change), it means the ID wasn't found
    return res
      .status(404)
      .json({ message: `Book with ID '${id}' not found for deletion.` });
  }

  // 204 No Content: Indicates successful deletion with no response body
  res.status(204).send();
});

// --- Server Activation ---

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});