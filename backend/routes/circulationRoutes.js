import express from "express";
import {
  checkout,
  overDueBooks,
  returnBook,
} from "../controllers/ciculationController.js";

const circulationRoutes = express.Router();

circulationRoutes.post("/checkout", checkout);
circulationRoutes.post("/return", returnBook);
circulationRoutes.get("/overdue-books", overDueBooks);

export default circulationRoutes;
