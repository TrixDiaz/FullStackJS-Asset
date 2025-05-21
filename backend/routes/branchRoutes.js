import express from "express";
import branchController from "../controllers/branchController.js";

const router = express.Router();

// Base route
router
  .route("/")
  .get(branchController.getBranches)
  .post(branchController.createBranch);

router
  .route("/:id")
  .get(branchController.getBranchById)
  .put(branchController.updateBranch)
  .delete(branchController.deleteBranch);

export default router;
