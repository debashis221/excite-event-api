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

export async function createEventsHandler(req: Request, res: Response) {
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

export async function getEventsHandler(req: Request, res: Response) {
  try {
    const data = await findEvents();
    if (data)
      return sendResponse(res, 200, "Events Fetched Successfully!", data);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function getEventsByIdHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = await findEventsById(id);
    if (data)
      return res
        .status(200)
        .json({
          status: "success",
          message: "Events retrieved successfully",
          statusCode: 200,
          data,
        })
        .end();
  } catch (error) {
    log.error(error);
  }
}

export async function updateEventsHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await updateEvents(id, body);
    if (data) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Events updated successfully",
          statusCode: 200,
          data,
        })
        .end();
    }
  } catch (error) {
    log.error(error);
  }
}

export async function deleteEventsHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = await deleteEvents(id);
    if (data) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Events deleted successfully",
          statusCode: 200,
          data,
        })
        .end();
    }
  } catch (error) {
    log.error(error);
  }
}
