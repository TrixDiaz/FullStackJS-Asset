import express from "express";
import roomController from "../controllers/roomController.js";

const router = express.Router();

// Base route
router.route("/").get(roomController.getRooms).post(roomController.createRoom);

router
  .route("/:id")
  .get(roomController.getRoomById)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

export default router;
