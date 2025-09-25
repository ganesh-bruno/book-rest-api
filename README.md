# Book REST API

A simple REST API for managing a collection of books, built with Node.js and Express. This API provides full CRUD operations for book management with in-memory storage.

## Endpoints

- **GET** `/api/books` - Retrieve all books
- **GET** `/api/books/:id` - Get a specific book by ID
- **POST** `/api/books` - Create a new book
- **PUT** `/api/books/:id` - Update an entire book (full replacement)
- **PATCH** `/api/books/:id` - Partially update a book
- **DELETE** `/api/books/:id` - Delete a book

## Book Schema

```json
{
  "id": "uuid",
  "title": "string",
  "author": "string", 
  "publicationYear": "number (optional)"
}
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## API Testing with Bruno

This project includes a Bruno collection for easy API testing. The collection contains pre-configured requests for all endpoints.

[<img src="https://fetch.usebruno.com/button.svg" alt="Fetch in Bruno" style="width: 130px; height: 30px;" width="128" height="32">](https://fetch.usebruno.com?url=https%3A%2F%2Fgithub.com%2Fganesh-bruno%2Fbook-rest-api.git "target=_blank rel=noopener noreferrer")


## Sample Data

The API comes pre-loaded with sample books:
- The Lord of the Rings by J.R.R. Tolkien (1954)
- Pride and Prejudice by Jane Austen (1813)
- 1984 by George Orwell (1949)

