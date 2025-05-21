import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    branch_code: {type: String},
    name: {type: String, required: true},
    location: {type: String},
    address: {type: String},
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
