import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum QuestionField {
  Uid = "uid",
  Message = "message",
  QuizId = "quizId",
}

interface IQuestion {
  [QuestionField.Uid]?: string;
  [QuestionField.Message]: string;
}

const QuestionModel = sequelize.define<Model<IQuestion>>("question", {
  [QuestionField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [QuestionField.Message]: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export { QuestionModel, IQuestion };
