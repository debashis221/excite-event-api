import { Response } from "express";

export function sendResponse<T>(
  res: Response,
  status: number,
  message: string,
  data: T
): void {
  res.status(status).json({ status, message, data }).end();
}
