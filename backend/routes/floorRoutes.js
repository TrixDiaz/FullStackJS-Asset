import express from "express";
import floorController from "../controllers/floorController.js";

const router = express.Router();

// Base route
router
  .route("/")
  .get(floorController.getFloors)
  .post(floorController.createFloor);

router
  .route("/:id")
  .get(floorController.getFloorById)
  .put(floorController.updateFloor)
  .delete(floorController.deleteFloor);

export default router;
