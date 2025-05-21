import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    type: {type: String},
    model: {type: String},
    quantity_total: {type: Number},
    quantity_available: {type: Number},
    location_type: {type: String},
    reorder_threshold: {type: Number},
    room_id: {type: [mongoose.Schema.Types.ObjectId], ref: "Room"},
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
