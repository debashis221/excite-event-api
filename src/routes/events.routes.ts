import express from "express";
import {
  createEventsHandler,
  deleteEventsHandler,
  getEventsByIdHandler,
  getEventsHandler,
  updateEventsHandler,
} from "../controller/events.controller";
import { requireUser } from "../middleware/requireUser";
import { uploadImage } from "../utils/multer";
import { asyncMiddleware } from "../utils/asyncMiddleware";

const router = express.Router();

router.get("/api/events", asyncMiddleware(getEventsHandler));
router.post(
  "/api/events",
  [requireUser, uploadImage.single("image")],
  asyncMiddleware(createEventsHandler)
);
router.get("/api/events/:id", asyncMiddleware(getEventsByIdHandler));
router.put("/api/events/:id", requireUser, updateEventsHandler);
router.delete(
  "/api/events/:id",
  requireUser,
  asyncMiddleware(deleteEventsHandler)
);

export default router;
