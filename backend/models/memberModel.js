import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
  {
    MemberName: {
      type: String,
      required: true,
    },
    MemberID: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.index({ MemberID: 1, MemberName: 1 });

const Members = mongoose.model("Members", memberSchema);

export default Members;
