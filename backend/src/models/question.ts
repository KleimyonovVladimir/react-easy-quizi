import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum QuestionField {
  Uid = "uid",
  QuestionJSON = "questionJSON",
  QuizId = "quizId",
}

interface IQuestion {
  [QuestionField.Uid]?: string;
  [QuestionField.QuestionJSON]: string;
}

const QuestionModel = sequelize.define<Model<IQuestion>>("question", {
  [QuestionField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [QuestionField.QuestionJSON]: {
    type: DataTypes.JSON,
    field: "question_JSON",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

QuestionModel.prototype.toJSON = function () {
  let values = { ...this?.get() };

  const parsedValues = { ...values, question: JSON.parse(values.questionJSON) };

  delete parsedValues.questionJSON;
  return parsedValues;
};

export { QuestionModel, IQuestion };
