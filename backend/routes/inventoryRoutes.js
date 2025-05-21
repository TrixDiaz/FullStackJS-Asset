import express from "express";
import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

// Base route
router
  .route("/")
  .get(inventoryController.getInventories)
  .post(inventoryController.createInventory);

router
  .route("/:id")
  .get(inventoryController.getInventoryById)
  .put(inventoryController.updateInventory)
  .delete(inventoryController.deleteInventory);

export default router;
