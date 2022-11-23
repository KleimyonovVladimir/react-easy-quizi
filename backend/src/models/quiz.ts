import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { QuestionDB, Quiz } from "../types";

export enum QuizField {
  Uid = "uid",
  Title = "title",
  CreatedBy = "createdBy",
  Time = "time",
}

interface IQuiz {
  [QuizField.Uid]?: string;
  [QuizField.Title]: string;
  [QuizField.CreatedBy]: string;
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
  [QuizField.CreatedBy]: {
    type: DataTypes.STRING,
    field: "created_by",
    allowNull: false,
    defaultValue: "",
    validate: {
      notEmpty: true,
    },
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
