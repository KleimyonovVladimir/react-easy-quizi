import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum ResultField {
  Uid = "uid",
  Score = "score",
  QuizUserId = "quizUserId",
}

export interface IResult {
  [ResultField.Uid]?: string;
  [ResultField.Score]: string;
  [ResultField.QuizUserId]: string;
}

const ResultModel = sequelize.define<Model<IResult>>("result", {
  [ResultField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [ResultField.Score]: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  [ResultField.QuizUserId]: {
    type: DataTypes.STRING,
    field: "quiz_user_id",
    defaultValue: "",
  },
});

export { ResultModel };
