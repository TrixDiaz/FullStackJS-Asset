import Asset from "../models/AssetSchema.js";

// Get all assets with optional pagination
const getAssets = async (req, res) => {
  try {
    const {page = 1, limit = 20, sort = "-createdAt"} = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const assets = await Asset.find({})
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const count = await Asset.countDocuments();

    res.status(200).json({
      assets,
      totalPages: Math.ceil(count / options.limit),
      currentPage: options.page,
      totalAssets: count,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get single asset by ID
const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({message: "Asset not found"});
    }

    // Add calculated fields
    const response = asset.toObject();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Create new asset
const createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    const createdAsset = await asset.save();
    res.status(201).json(createdAsset);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update asset
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!asset) {
      return res.status(404).json({message: "Asset not found"});
    }

    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete asset
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) {
      return res.status(404).json({message: "Asset not found"});
    }

    res.status(200).json({message: "Asset successfully removed"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Search assets
const searchAssets = async (req, res) => {
  try {
    const {query} = req.query;

    if (!query) {
      return res.status(400).json({message: "Search query is required"});
    }

    const assets = await Asset.find({
      $or: [
        {name: {$regex: query, $options: "i"}},
        {serialNumber: {$regex: query, $options: "i"}},
        {model: {$regex: query, $options: "i"}},
        {manufacturer: {$regex: query, $options: "i"}},
        {tags: {$regex: query, $options: "i"}},
      ],
    });

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get asset count by status
const getAssetCountByStatus = async (req, res) => {
  try {
    const statusCounts = await Asset.aggregate([
      {
        $group: {
          _id: "$status",
          count: {$sum: 1},
        },
      },
      {
        $sort: {_id: 1},
      },
    ]);

    res.status(200).json(statusCounts);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetCountByStatus,
  searchAssets,
};
