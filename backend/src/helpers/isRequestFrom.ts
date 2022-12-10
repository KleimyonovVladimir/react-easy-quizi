import { IUser } from "../models/user";
import { UserStatusEnums } from "../types";

export const isRequestFromAdmin = (user?: IUser) => {
  if (!user) {
    return false;
  }

  if (user.status === UserStatusEnums.Admin) {
    return true;
  }

  return false;
};

export const isRequestFromTeacher = (user?: IUser) => {
  if (!user) {
    return false;
  }

  if (user.status === UserStatusEnums.Teacher) {
    return true;
  }

  return false;
};
