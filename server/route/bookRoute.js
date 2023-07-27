/** @format */

const express = require("express");
const {
	createBookController,
	getAllBooksController,
	getSingleBookController,
	updateBookController,
	deleteBookController,
} = require("../controller/bookController");

const authMiddleware = require("../middleware/authMiddleware");

const bookRouter = express.Router();

// creating a new book
bookRouter.post("/createBook", authMiddleware, createBookController);

// fetching all books
bookRouter.get("/getBooks", getAllBooksController);

// fetching a single book
bookRouter.get("/getBook/:id", authMiddleware, getSingleBookController);

// updating a book
bookRouter.put("/updateBook/:id", authMiddleware, updateBookController);

// deleting a book
bookRouter.delete("/deleteBook/:id", authMiddleware, deleteBookController);

module.exports = bookRouter;
