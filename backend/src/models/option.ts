import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export enum OptionField {
  Uid = "uid",
  Option = "option",
  QuestionId = "questionId",
  IsCorrect = "isCorrect",
}

interface IOption {
  [OptionField.Uid]?: string;
  [OptionField.Option]: string;
  [OptionField.IsCorrect]: boolean;
}

const OptionModel = sequelize.define<Model<IOption>>("option", {
  [OptionField.Uid]: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  [OptionField.Option]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  [OptionField.IsCorrect]: {
    type: DataTypes.BOOLEAN,
    field: "is_correct",
    defaultValue: false,
  },
});

export { OptionModel };
