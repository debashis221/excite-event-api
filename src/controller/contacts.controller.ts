import { Request, Response } from "express";
import {
  createContacts,
  deleteContactsById,
  findContacts,
  findContactsById,
} from "../service/contacts.service";
import { sendResponse } from "../utils/sendReponse";
import log from "../utils/logger";

export async function createContactsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const body = req.body;
    const contacts = await createContacts(body);
    if (contacts) {
      return sendResponse(res, 200, "Contacts created successfully!", contacts);
    }
  } catch (error) {
    log.error((error as any).message);
    return sendResponse(res, 500, (error as any).message, null);
  }
}

export async function getContactsByIdHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const data = await findContactsById(id);
    if (data)
      return sendResponse(res, 200, "Contacts Fetched Successfully!", data);
  } catch (error) {
    log.error((error as any).message);
    return sendResponse(res, 500, (error as any).message, null);
  }
}

export async function getContactsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await findContacts();
    if (data)
      return sendResponse(res, 200, "Contacts Fetched Successfully!", data);
  } catch (error) {
    log.error((error as any).message);
    return sendResponse(res, 500, (error as any).message, null);
  }
}

export async function deleteContactsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const data = await deleteContactsById(id);
    if (data) {
      return sendResponse(res, 200, "Contacts Deleted Successfully!", null);
    }
    return sendResponse(res, 404, "Contacts Not Found!", null);
  } catch (error) {
    log.error((error as any).message);
    return sendResponse(res, 500, (error as any).message, null);
  }
}
