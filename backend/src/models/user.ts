import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { UserStatusEnums } from "../types";
import { generateHashPassword } from "../utils/hashPassword";

export enum UserField {
  Uid = "uid",
  Email = "email",
  FullName = "fullName",
  Status = "status",
  Password = "password",
}

interface IUser {
  [UserField.Uid]?: string;
  [UserField.FullName]: string;
  [UserField.Email]: string;
  [UserField.Status]: UserStatusEnums;
  [UserField.Password]: string;
}

const UserModel = sequelize.define<Model<IUser>>("user", {
  [UserField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [UserField.Email]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  [UserField.FullName]: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "full_name",
    validate: {
      notEmpty: true,
    },
  },
  [UserField.Status]: {
    type: DataTypes.STRING,
    defaultValue: UserStatusEnums.Student,
  },
  [UserField.Password]: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 6,
    },
  },
});

UserModel.prototype.toJSON = function () {
  let values = Object.assign({}, this?.get());

  delete values.password;
  return values;
};

// Encrypting user's password before creating
UserModel.beforeCreate(async (user) => {
  const initPassword = user.getDataValue(UserField.Password) || ""; // unencrypted password
  const hashedPassword = (await generateHashPassword(initPassword)) as string;

  user.setDataValue(UserField.Password, hashedPassword);
});

export { UserModel, IUser };
