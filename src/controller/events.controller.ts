import { Request, Response } from "express";
import {
  createEvents,
  deleteEvents,
  findEvents,
  findEventsById,
  updateEvents,
} from "../service/events.service";
import log from "../utils/logger";
import { sendResponse } from "../utils/sendReponse";

export async function createEventsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const body = req.body;
    const location = req.body.location.split(",");
    const tempArray: number[] = [];
    location.forEach((element: string) => {
      tempArray.push(parseFloat(element));
    });
    req.body.image = req.file?.originalname;
    req.body.location = tempArray;
    const events = await createEvents(body);
    if (events) {
      return sendResponse(res, 200, "Events created successfully!", events);
    }
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function getEventsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = await findEvents();
    if (data)
      return sendResponse(res, 200, "Events Fetched Successfully!", data);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function getEventsByIdHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const data = await findEventsById(id);
    if (data)
      return sendResponse(res, 200, "Events Fetched Successfully!", data);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function updateEventsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(req.body);
    if (req.body.location) {
      const location = req.body.location.split(",");
      const tempArray: number[] = [];
      location.forEach((element: string) => {
        tempArray.push(parseFloat(element));
      });
      req.body.location = tempArray;
    }
    req.body.image = req.file?.originalname;
    const data = await updateEvents(id, body);
    if (data) {
      return sendResponse(res, 200, "Events updated successfully!", data);
    }
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function deleteEventsHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const data = await deleteEvents(id);
    if (data) {
      return sendResponse(res, 200, "Events deleted successfully!", data);
    }
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}
