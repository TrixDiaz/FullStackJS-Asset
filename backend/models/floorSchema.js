import mongoose from "mongoose";

const floorSchema = new mongoose.Schema(
  {
    branch_id: {type: [mongoose.Schema.Types.ObjectId], ref: "Branch"},
    floor_number: {type: Number},
    description: {type: String},
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Floor = mongoose.model("Floor", floorSchema);

export default Floor;
