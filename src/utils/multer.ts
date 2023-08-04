import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "src/uploads/images");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req: Request, file: any, cb: any) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadImage = multer({ storage });
