import { IUser, UserField } from "../models/user";
import { UserStatusEnums } from "../types";

export const isUserStudent = (user: IUser) => {
  return user?.[UserField.Status] === UserStatusEnums.Student;
};
