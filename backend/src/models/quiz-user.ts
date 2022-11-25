import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum QuizUserField {
  Uid = "uid",
  UserId = "userUid",
  QuizId = "quizUid",
}

export interface IQuizUser {
  [QuizUserField.Uid]?: string;
  [QuizUserField.UserId]?: string;
  [QuizUserField.QuizId]?: string;
}

const QuizUserModel = sequelize.define<Model<IQuizUser>>("quiz-user", {
  [QuizUserField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [QuizUserField.UserId]: {
    type: DataTypes.UUID,
    field: "user_uid",
    defaultValue: "",
  },
  [QuizUserField.QuizId]: {
    type: DataTypes.UUID,
    field: "quiz_uid",
    defaultValue: "",
  },
});

export { QuizUserModel };
