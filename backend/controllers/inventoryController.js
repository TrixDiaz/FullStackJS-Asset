import Inventory from "../models/inventorySchema.js";

// Get all inventory items with optional pagination
const getInventories = async (req, res) => {
  try {
    const {page = 1, limit = 20, sort = "-createdAt"} = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const inventories = await Inventory.find({})
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const count = await Inventory.countDocuments();

    res.status(200).json({
      inventories,
      totalPages: Math.ceil(count / options.limit),
      currentPage: options.page,
      totalInventories: count,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get single inventory item by ID
const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({message: "Inventory item not found"});
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Create new inventory item
const createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    const createdInventory = await inventory.save();
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update inventory item
const updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inventory) {
      return res.status(404).json({message: "Inventory item not found"});
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({message: "Inventory item not found"});
    }

    res.status(200).json({message: "Inventory item successfully removed"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  getInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
};
