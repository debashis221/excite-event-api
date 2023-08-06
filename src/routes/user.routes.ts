import express from "express";
import {
  createUserHandler,
  deleteUserById,
  getAllUsersHandler,
  getCurrentUserHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../controller/user.controller";
import { requireUser } from "../middleware/requireUser";
import { uploadImage } from "../utils/multer";
import { asyncMiddleware } from "../utils/asyncMiddleware";

const router = express.Router();

router.post(
  "/api/users",
  uploadImage.single("image"),
  asyncMiddleware(createUserHandler)
);
router.get(
  "/api/users/me",
  requireUser,
  asyncMiddleware(getCurrentUserHandler)
);
router.patch(
  "/api/users/:id",
  [uploadImage.single("image"), requireUser],
  asyncMiddleware(updateUserHandler)
);
router.delete("/api/users/:id", requireUser, asyncMiddleware(deleteUserById));
router.get("/api/users/:id", asyncMiddleware(getUserByIdHandler));
router.get("/api/users", asyncMiddleware(getAllUsersHandler));

export default router;
