import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import { UserStatusEnums } from "../types";

const allowedStatuses = [UserStatusEnums.Admin, UserStatusEnums.Teacher];

export const isModerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(400).send("You are not logged in");
  }

  const { status } = req.user as IUser;

  if (allowedStatuses.includes(status)) {
    return next();
  } else {
    return res.status(400).send("You do not have permission");
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(400).send("You are not logged in");
  }

  const { status } = req.user as IUser;

  if (status === UserStatusEnums.Admin) {
    return next();
  } else {
    return res.status(400).send("You are not the admin");
  }
};
