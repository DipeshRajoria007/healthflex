import Circulations from "../models/circulationModel.js";
import { StatusEnums } from "../utils/enums.js";
import Books from "../models/bookModel.js";
export const checkout = async (req, res) => {
  try {
    const { BookID, MemberID } = req.body;
    const exsistingCirculation = await Circulations.findOne({
      BookID,
      MemberID,
      Status: StatusEnums.ISSUED,
    });
    if (exsistingCirculation) {
      return res.status(400).json({
        status: "error",
        error: "Book is already issued to the member",
      });
    }
    const book = await Books.findOne({
      BookID,
    });
    if (!book) {
      return res.status(400).json({
        status: "error",
        error: "Book not found",
      });
    }
    if (book.NumberOfCopies === 0) {
      return res.status(400).json({
        status: "error",
        error: "No copies available",
      });
    }
    book.NumberOfCopies -= 1;
    await book.save();
    const circulation = await Circulations.create({
      MemberID: parseInt(MemberID),
      BookID: parseInt(BookID),
      DateOfIssue: new Date(),
      DateOfReturn: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      Status: StatusEnums.ISSUED,
    });
    return res.status(200).json({
      status: "success",
      data: circulation,
      message: "Book issued successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { BookID, MemberID } = req.body;
    const circulation = await Circulations.findOne({
      BookID,
      MemberID,
      Status: StatusEnums.ISSUED,
    });
    if (!circulation) {
      return res.status(400).json({
        status: "error",
        error: "Book is not issued to the member",
      });
    }
    const book = await Books.findOne({
      BookID,
    });
    if (!book) {
      return res.status(400).json({
        status: "error",
        error: "Book not found",
      });
    }
    book.NumberOfCopies += 1;
    await book.save();

    circulation.Status = StatusEnums.RETURNED;
    circulation.DateOfReturn = new Date();
    await circulation.save();
    return res.status(200).json({
      status: "success",
      data: circulation,
      message: "Book returned successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

export const overDueBooks = async (req, res) => {
  try {
    const circulations = await Circulations.find({
      Status: StatusEnums.ISSUED,
      DateOfReturn: {
        $lt: new Date(),
      },
    });
    return res.status(200).json({
      status: "success",
      data: circulations,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

// get circulation history from body and calculate fine
export const getFine = async (req, res) => {
  try {
    const { MemberID } = req.body;
    const circulations = await Circulations.find({
      MemberID,
      Status: StatusEnums.RETURNED,
    });
    let fine = 0;
    circulations.forEach((circulation) => {
      const diff = circulation.DateOfReturn - circulation.DateOfIssue;
      const days = diff / (1000 * 60 * 60 * 24);
      if (days > 7) {
        fine += (days - 7) * 10;
      }
    });
    return res.status(200).json({
      status: "success",
      data: fine,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
}

