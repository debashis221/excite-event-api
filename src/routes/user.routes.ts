import express from "express";
import {
  createUserHandler,
  deleteUserById,
  getAllUsersHandler,
  getCurrentUserHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import { uploadImage } from "../utils/multer";

const router = express.Router();

router.post("/api/users", uploadImage.single("image"), createUserHandler);
router.get("/api/users/me", requireUser, getCurrentUserHandler);
router.patch(
  "/api/users/:id",
  [
    uploadImage.fields([
      { name: "image", maxCount: 1 },
    ]),
    requireUser,
  ],
  updateUserHandler
);
router.delete("/api/users/:id", requireUser, deleteUserById);
router.get("/api/users/:id", getUserByIdHandler);
router.get("/api/users", getAllUsersHandler);

export default router;
