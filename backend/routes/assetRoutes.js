import express from "express";
import assetController from "../controllers/assetController.js";

const router = express.Router();

// Base route
router
  .route("/")
  .get(assetController.getAssets)
  .post(assetController.createAsset);

router
  .route("/:id")
  .get(assetController.getAssetById)
  .put(assetController.updateAsset)
  .delete(assetController.deleteAsset);

export default router;
