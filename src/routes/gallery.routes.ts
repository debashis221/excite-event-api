import express from "express";
import { requireUser } from "../middleware/requireUser";
import { uploadImage } from "../utils/multer";
import { asyncMiddleware } from "../utils/asyncMiddleware";
import {
  createGalleryHandler,
  deleteGalleryHandler,
  getGalleryHandler,
} from "../controller/gallery.controller";

const router = express.Router();

router.post(
  "/api/gallery",
  [ uploadImage.array("image", 100)],
  asyncMiddleware(createGalleryHandler)
);

router.get("/api/gallery", asyncMiddleware(getGalleryHandler));
router.delete(
  "/api/gallery/:id",
  requireUser,
  asyncMiddleware(deleteGalleryHandler)
);

export default router;
