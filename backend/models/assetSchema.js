import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    room_id: {type: [mongoose.Schema.Types.ObjectId], ref: "Room"},
    name: {type: String, required: true},
    type: {type: String},
    code: {type: String},
    description: {type: String},
    status: {type: String},
    tags: {type: [String]},
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
