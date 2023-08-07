import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendReponse";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) {
    return sendResponse(res, 401, "Unauthorized", null);
  }

  return next();
};
