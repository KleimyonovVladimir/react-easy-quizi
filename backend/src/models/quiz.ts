import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum QuizField {
  Uid = "uid",
  Title = "title",
}

interface IQuiz {
  [QuizField.Uid]?: string;
  [QuizField.Title]: string;
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
});

export { QuizModel, IQuiz };
