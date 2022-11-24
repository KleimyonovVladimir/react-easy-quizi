import { NextFunction, Request, Response } from "express";

export const checkIsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
};
