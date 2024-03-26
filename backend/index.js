import "./config/db.config.js";
// setup express server
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import memberRoutes from "./routes/memberRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import circulationRoutes from "./routes/circulationRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup routes
app.get("/health", (req, res) => {
  res.send("Server is up and running 🚀");
});
app.use("/api/members", memberRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/circulation", circulationRoutes);
app.use((req, res, next) => {
  res.status(404).send({ message: `Not found: ${req.originalUrl}` });
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
