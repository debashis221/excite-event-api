import { Request, Response } from "express";
import {
  createEvents,
  deleteEvents,
  findEvents,
  findEventsById,
  updateEvents,
} from "../service/events.service";
import log from "../utils/logger";

export async function createEventsHandler(req: Request, res: Response) {
  try {
    const body = req.body;
    req.body.image = req.file.originalname;
    const events = await createEvents(body);
    if (events) {
      return res.status(200).json({
        status: "success",
        message: "Events created successfully",
        statusCode: 200,
        events,
      });
    }
  } catch (error) {
    log.error(error);
  }
}

export async function getEventsHandler(req: Request, res: Response) {
  try {
    const data = await findEvents();
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
