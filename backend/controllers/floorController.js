import Floor from "../models/floorSchema.js";

// Get all floors with optional pagination
const getFloors = async (req, res) => {
  try {
    const {page = 1, limit = 20, sort = "-createdAt"} = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const floors = await Floor.find({})
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const count = await Floor.countDocuments();

    res.status(200).json({
      floors,
      totalPages: Math.ceil(count / options.limit),
      currentPage: options.page,
      totalFloors: count,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get single floor by ID
const getFloorById = async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);
    if (!floor) {
      return res.status(404).json({message: "Floor not found"});
    }

    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Create new floor
const createFloor = async (req, res) => {
  try {
    const floor = new Floor(req.body);
    const createdFloor = await floor.save();
    res.status(201).json(createdFloor);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update floor
const updateFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!floor) {
      return res.status(404).json({message: "Floor not found"});
    }

    res.status(200).json(floor);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete floor
const deleteFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);

    if (!floor) {
      return res.status(404).json({message: "Floor not found"});
    }

    res.status(200).json({message: "Floor successfully removed"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  getFloors,
  getFloorById,
  createFloor,
  updateFloor,
  deleteFloor,
};
