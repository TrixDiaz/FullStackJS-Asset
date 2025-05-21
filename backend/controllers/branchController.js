import Branch from "../models/branchSchema.js";

// Get all branches with optional pagination
const getBranches = async (req, res) => {
  try {
    const {page = 1, limit = 20, sort = "-createdAt"} = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
    };

    const branches = await Branch.find({})
      .sort(sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const count = await Branch.countDocuments();

    res.status(200).json({
      branches,
      totalPages: Math.ceil(count / options.limit),
      currentPage: options.page,
      totalBranches: count,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Get single branch by ID
const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({message: "Branch not found"});
    }

    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Create new branch
const createBranch = async (req, res) => {
  try {
    const branch = new Branch(req.body);
    const createdBranch = await branch.save();
    res.status(201).json(createdBranch);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Update branch
const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!branch) {
      return res.status(404).json({message: "Branch not found"});
    }

    res.status(200).json(branch);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// Delete branch
const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);

    if (!branch) {
      return res.status(404).json({message: "Branch not found"});
    }

    res.status(200).json({message: "Branch successfully removed"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export default {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
