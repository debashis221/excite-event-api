import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403).json({
      status: 403,
      message: "You are not allowed to access this route",
    });
  }

  return next();
};

export default requireUser;
