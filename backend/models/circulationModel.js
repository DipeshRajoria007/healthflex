import mongoose from "mongoose";

const circulationSchema = mongoose.Schema(
  {
    MemberID: {
      type: Number,
      required: true,
    },
    BookID: {
      type: Number,
      required: true,
    },
    DateOfIssue: {
      type: Date,
      required: true,
    },
    DateOfReturn: {
      type: Date,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Circulations = mongoose.model("Circulations", circulationSchema);
export default Circulations;
