import express from "express";
import { asyncMiddleware } from "../utils/asyncMiddleware";
import {
  createContactsHandler,
  deleteContactsHandler,
  getContactsByIdHandler,
  getContactsHandler,
} from "../controller/contacts.controller";
import { requireUser } from "../middleware/requireUser";
const router = express.Router();

router.get("/api/contacts", asyncMiddleware(getContactsHandler));
router.get("/api/contacts/:id", asyncMiddleware(getContactsByIdHandler));
router.post(
  "/api/contacts",
  asyncMiddleware(createContactsHandler)
);
router.delete(
  "/api/contacts/:id",
  requireUser,
  asyncMiddleware(deleteContactsHandler)
);

export default router;
