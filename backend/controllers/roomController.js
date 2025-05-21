import Room from "../models/roomSchema.js";

// Get all rooms with optional pagination
const getRooms = async (req, res) => {
  try {
    const {page = 1, limit = 20, sort = "-createdAt"} = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const rooms = await Room.find({})
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const count = await Room.countDocuments();

    res.status(200).json({
      rooms,
      totalPages: Math.ceil(count / options.limit),
      currentPage: options.page,
      totalRooms: count,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get single room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({message: "Room not found"});
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Create new room
const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({message: "Room not found"});
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({message: "Room not found"});
    }

    res.status(200).json({message: "Room successfully removed"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
