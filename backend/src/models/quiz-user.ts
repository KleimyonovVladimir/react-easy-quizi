import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum QuizUserField {
  Uid = "uid",
}

interface IQuizUser {
  [QuizUserField.Uid]?: string;
}

const QuizUserModel = sequelize.define<Model<IQuizUser>>("quiz-user", {
  [QuizUserField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
});

export { QuizUserModel };
