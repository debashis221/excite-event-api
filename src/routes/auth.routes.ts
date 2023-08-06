import express from "express";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import { asyncMiddleware } from "../utils/asyncMiddleware";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  asyncMiddleware(createSessionHandler)
);

router.post(
  "/api/sessions/refresh",
  asyncMiddleware(refreshAccessTokenHandler)
);

export default router;
