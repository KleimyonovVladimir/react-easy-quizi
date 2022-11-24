import { UserModel } from "../models/user";
import { UserStatusEnums } from "../types";

const adminUser = {
  email: "admin@easy-quizi.com",
  fullName: "Administrator",
  status: UserStatusEnums.Admin,
  password: "123456",
};

export const initialDBInitialization = async () => {
  const admin = await UserModel.findOne({ where: { email: adminUser.email } });

  if (!admin) {
    UserModel.create(adminUser);
  }
};
