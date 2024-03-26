import express from "express";
import Books from "../models/bookModel.js";
import {
  addBooks,
  getBookById,
  getBooks,
} from "../controllers/bookController.js";

const bookRoutes = express.Router();

bookRoutes.get("/", getBooks);
bookRoutes.get("/:id", getBookById);
bookRoutes.post("/add-books", addBooks);

export default bookRoutes;
