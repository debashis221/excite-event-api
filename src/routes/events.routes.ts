import express from "express";
import {
    createEventsHandler,
  deleteEventsHandler,
  getEventsByIdHandler,
  getEventsHandler,
  updateEventsHandler,
} from "../controller/events.controller";
import requireUser from "../middleware/requireUser";
import { uploadImage } from "../utils/multer";

const router = express.Router();

router.get("/api/events", getEventsHandler);
router.post(
  "/api/events",
  [requireUser, uploadImage.single("image")],
  createEventsHandler
);
router.get("/api/events/:id", getEventsByIdHandler);
router.patch("/api/events/:id", requireUser, updateEventsHandler);
router.delete("/api/events/:id", requireUser, deleteEventsHandler);

export default router;
