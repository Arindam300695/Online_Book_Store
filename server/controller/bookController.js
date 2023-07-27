const asyncHandler = require("express-async-handler");
const Book = require("../model/bookModel");

// Creating a new book and saving it to the database
const createBookController = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { title, description, author, price, bookImageUrl } = req.body;

    // Checking if any field is empty
    if (!title || !description || !author || !price || !bookImageUrl) {
        return res.json({ error: "All the fields are required" });
    }

    // Need to check whether the book already exists or not
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
        return res.json({ error: "Book already exists" });
    }

    // If everything is fine, then save the book to the database
    const book = new Book({
        title,
        description,
        author,
        price,
        bookImageUrl,
        userId,
    });
    await book.save();

    try {
        res.json({ message: "Book saved to database", book });
    } catch (error) {
        return res.json({ error: "Something went wrong" });
    }
});

// Get all books
const getAllBooksController = asyncHandler(async (req, res) => {
    const result = await Book.find();
    try {
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ error: error.message });
    }
});

// Get a single book based on its id
const getSingleBookController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Book.findById(id);
    try {
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ error: error.message });
    }
});

// Update book
const updateBookController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, author, price, bookImageUrl } = req.body;
    const result = await Book.findById(id);
    if (result.userId.toString() !== userId) {
        return res.json({
            error: "You are not allowed to make changes to this",
        });
    }
    try {
        if (result) {
            result.title = title;
            result.description = description;
            result.author = author;
            result.price = price;
            result.bookImageUrl = bookImageUrl;
            await result.save();
            return res.json({
                message: "Updated successfully",
                updatedBook: result,
            });
        }
    } catch (error) {
        return res.json({ error: error.message });
    }
});

// Delete book
const deleteBookController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const result = await Book.findById(id);
    if (result.userId.toString() !== userId) {
        return res.json({ error: "You are not allowed to delete this" });
    }
    try {
        await Book.findByIdAndDelete(id);
        return res.json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

module.exports = {
    createBookController,
    getAllBooksController,
    getSingleBookController,
    updateBookController,
    deleteBookController,
};
