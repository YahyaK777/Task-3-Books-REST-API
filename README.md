# Task 3 - Books REST API

A simple REST API built with **Node.js** and **Express.js** to manage a list of books. It supports CRUD operations and stores data in an in-memory JavaScript array. No database is required.

## Features

- View all books.
- View one book using its ID.
- Add a new book.
- Update an existing book.
- Delete a book.
- Validate request data and book IDs.
- Return useful HTTP status codes and JSON messages.

Each book has this structure:

```json
{
  "id": 1,
  "title": "The Alchemist",
  "author": "Paulo Coelho"
}
```

## Requirements

- Node.js and npm
- Visual Studio Code (or another code editor)
- Postman (optional, for testing the API)

## Setup and run

1. Open this project folder in VS Code.
2. Open the terminal in the project folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

The terminal should display:

```text
Books REST API is running at http://localhost:3000
```

To stop the server, press `Ctrl + C`.

## API endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Success status |
|---|---|---|---|
| GET | `/books` | Get all books | 200 OK |
| GET | `/books/:id` | Get one book by ID | 200 OK |
| POST | `/books` | Add a book | 201 Created |
| PUT | `/books/:id` | Update a book | 200 OK |
| DELETE | `/books/:id` | Delete a book | 200 OK |

### 1. Get all books

**GET** `http://localhost:3000/books`

Example response:

```json
{
  "count": 3,
  "books": [
    { "id": 1, "title": "The Alchemist", "author": "Paulo Coelho" },
    { "id": 2, "title": "Wings of Fire", "author": "A. P. J. Abdul Kalam" },
    { "id": 3, "title": "Atomic Habits", "author": "James Clear" }
  ]
}
```

### 2. Get a book by ID

**GET** `http://localhost:3000/books/1`

### 3. Add a book

**POST** `http://localhost:3000/books`

In Postman, select **Body > raw > JSON** and send:

```json
{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki"
}
```

### 4. Update a book

**PUT** `http://localhost:3000/books/1`

Send both fields in JSON:

```json
{
  "title": "The Alchemist - Updated",
  "author": "Paulo Coelho"
}
```

### 5. Delete a book

**DELETE** `http://localhost:3000/books/1`

## Testing with Postman

A ready-to-import Postman collection is included at:

`postman/Books REST API.postman_collection.json`

To use it:

1. Start the Node.js server.
2. Open Postman.
3. Click **Import**.
4. Select the collection JSON file from the `postman` folder.
5. Run the requests in this order: Get All Books, Get Book by ID, Add Book, Update Book, Delete Book.
6. For the update and delete examples, use an ID that currently exists.

You can also test the API by entering the URLs and JSON bodies shown above manually.

## HTTP status codes used

- **200 OK** - The request succeeded.
- **201 Created** - A new book was added.
- **400 Bad Request** - The ID or request data is invalid.
- **404 Not Found** - The requested book or route does not exist.
- **500 Internal Server Error** - An unexpected server error occurred.

## Important note about in-memory storage

Books are stored in a JavaScript array inside `server.js`. This means the data is temporary. Any books added, updated, or deleted are reset to the original sample data when the server restarts. This is expected because the task does not require a database.

## Interview questions and answers

### 1. What is REST?
REST stands for Representational State Transfer. It is a way to design web services that communicate using HTTP. REST APIs commonly exchange data in JSON format.

### 2. What are HTTP methods and their use?
- GET: Read data.
- POST: Create new data.
- PUT: Update existing data.
- DELETE: Remove data.

### 3. How do you handle routes in Express?
Routes are created using methods such as `app.get()`, `app.post()`, `app.put()` and `app.delete()`. Each route handles a particular URL and HTTP method.

### 4. What is middleware in Express?
Middleware is a function that runs during the request-response cycle. It can read or modify the request, send a response, or pass control to the next middleware. `express.json()` is used in this project to parse JSON request bodies.

### 5. How do you parse JSON in Express?
Use `app.use(express.json())`. It makes JSON data sent in the request body available through `req.body`.

### 6. What status codes do you use for CRUD?
This project uses 200 for successful reading, updating and deleting, 201 for creating a book, 400 for invalid input, and 404 when a book is not found.

### 7. How would you handle errors in Express?
Validate request data, return suitable status codes, and use error-handling middleware with four parameters: `err`, `req`, `res` and `next`.

### 8. What is CORS?
CORS stands for Cross-Origin Resource Sharing. It is a browser security mechanism that controls whether a web page from one origin can access resources from another origin. This simple API does not need CORS configuration for the local Postman tests.

### 9. Explain request and response objects in Express.
`req` contains information sent by the client, such as route parameters and request body. `res` is used by the server to send a response, such as JSON data and an HTTP status code.

### 10. How do you test API endpoints?
Use Postman to select the HTTP method, enter the endpoint URL, send JSON data when required, and check the response body and status code.

## Project structure

```text
task3_books_rest_api/
├── postman/
│   └── Books REST API.postman_collection.json
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Learning outcome

This project demonstrates REST API basics, Express routing, HTTP methods, middleware, JSON handling, CRUD operations, input validation and API testing.
