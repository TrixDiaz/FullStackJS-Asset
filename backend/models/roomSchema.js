import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    floor_id: {type: [mongoose.Schema.Types.ObjectId], ref: "Floor"},
    room_number: {type: Number},
    name: {type: String},
    capacity: {type: Number},
    description: {type: String},
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
