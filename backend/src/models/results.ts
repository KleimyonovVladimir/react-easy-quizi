import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum ResultField {
  Uid = "uid",
  Score = "score",
  FinishedAt = "finishedAt",
  UserUid = "userUid",
  QuizUid = "quizUid",
}

export interface IResult {
  [ResultField.Uid]?: string;
  [ResultField.Score]: string;
  [ResultField.FinishedAt]: Date;
  [ResultField.UserUid]: string;
  [ResultField.QuizUid]: string;
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
  [ResultField.FinishedAt]: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  [ResultField.UserUid]: {
    type: DataTypes.UUID,
    field: "user_uid",
    defaultValue: "",
  },
  [ResultField.QuizUid]: {
    type: DataTypes.UUID,
    field: "quiz_uid",
    defaultValue: "",
  },
});

ResultModel.prototype.toJSON = function () {
  let values = Object.assign({}, this?.get());

  delete values.userUid;
  delete values.quizUid;
  return values;
};

export { ResultModel };
