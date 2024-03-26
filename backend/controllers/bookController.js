import Books from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    return res.status(200).json({
      status: "success",
      count: books.length,
      data: books,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        error: "Book not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

export const addBooks = async (req, res) => {
  try {
    const book = await Books.insertMany(req.body);
    return res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
