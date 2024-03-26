import Members from "../models/memberModel.js";

export const addMembers = async (req, res) => {
  try {
    const member = await Members.insertMany(req.body);
    return res.status(200).json({
      status: "success",
      data: member,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
export const getMemberById = async (req, res) => {
  try {
    const member = await Members.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        status: "error",
        error: "Member not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: member,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};

export const getMembers = async (req, res) => {
  try {
    const members = await Members.find({});
    return res.status(200).json({
      status: "success",
      count: members.length,
      data: members,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
};
