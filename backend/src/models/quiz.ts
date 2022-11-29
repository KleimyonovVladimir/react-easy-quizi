import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { QuestionDB, Quiz } from "../types";

export enum QuizField {
  Uid = "uid",
  Title = "title",
  CreatedById = "createdById",
  Time = "time",
}

interface IQuiz {
  [QuizField.Uid]?: string;
  [QuizField.Title]: string;
  [QuizField.CreatedById]: string;
  [QuizField.Time]: string;
}

const QuizModel = sequelize.define<Model<IQuiz>>("quiz", {
  [QuizField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [QuizField.Title]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  [QuizField.CreatedById]: {
    type: DataTypes.UUID,
    field: "created_by_id",
  },
  [QuizField.Time]: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    validate: {
      notEmpty: true,
    },
  },
});

QuizModel.prototype.toJSON = function () {
  return { ...this?.get() } as Quiz<QuestionDB>;
};

export { QuizModel, IQuiz };
