import { Request, Response } from "express";
import {
  createGallery,
  deleteGallery,
  getGallery,
} from "../service/gallery.service";
import { sendResponse } from "../utils/sendReponse";
import log from "../utils/logger";

export async function createGalleryHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const body = req.body;
    if (req.files) {
      const imageFiles = req.files as Express.Multer.File[];
      for (const imageFile of imageFiles) {
        body.image = imageFile.originalname;
        await createGallery(body);
      }
    }
    return sendResponse(res, 200, "Gallery created successfully!", null);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function getGalleryHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await getGallery();
    if (data)
      return sendResponse(res, 200, "Gallery Fetched Successfully!", data);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function deleteGalleryHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    await deleteGallery(id);
    return sendResponse(res, 200, "Gallery Deleted Successfully!", null);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}
