import express from "express";
import Members from "../models/memberModel.js";
import {
  addMembers,
  getMemberById,
  getMembers,
} from "../controllers/memberController.js";
const memberRoutes = express.Router();

memberRoutes.get("/", getMembers);
memberRoutes.get("/:id", getMemberById);

memberRoutes.post("/add-members", addMembers);

export default memberRoutes;
