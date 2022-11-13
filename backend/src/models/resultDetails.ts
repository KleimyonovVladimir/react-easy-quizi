import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum ResultDetailsField {
  Uid = "uid",
  ResultId = "resultId",
  QuestionId = "questionId",
  AnsweredOptionId = "answeredOptionId",
}

interface IResultDetails {
  [ResultDetailsField.Uid]?: string;
  [ResultDetailsField.QuestionId]: string;
  [ResultDetailsField.AnsweredOptionId]: string;
}

const ResultDetailsModel = sequelize.define<Model<IResultDetails>>(
  "result-details",
  {
    [ResultDetailsField.Uid]: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    [ResultDetailsField.QuestionId]: {
      type: DataTypes.STRING,
      field: "question_id",
      defaultValue: "",
    },
    [ResultDetailsField.AnsweredOptionId]: {
      type: DataTypes.STRING,
      field: "answered_option_id",
      defaultValue: "",
    },
  }
);

export { ResultDetailsModel };
