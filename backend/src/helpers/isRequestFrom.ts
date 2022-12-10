import { IUser } from "../models/user";
import { UserStatusEnums } from "../types";

export const isRequestFromRoleType = (role: UserStatusEnums, user?: IUser) => {
  if (!user) {
    return false;
  }

  if (user.status === role) {
    return true;
  }

  return false;
};
