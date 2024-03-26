import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    BookName: {
      type: String,
      required: true,
    },
    BookID: {
      type: Number,
      required: true,
      unique: true,
    },
    NumberOfCopies: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
bookSchema.index({ BookID: 1, BookName: 1 });

const Books = mongoose.model("Books", bookSchema);
export default Books;
