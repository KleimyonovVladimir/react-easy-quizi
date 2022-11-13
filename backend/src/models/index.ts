import { UserModel } from "./user";
import { QuizModel } from "./quiz";
import { ResultModel } from "./results";
import { ResultDetailsModel } from "./resultDetails";
import { QuestionModel } from "./question";
import { OptionModel } from "./option";
import { QuizUserModel } from "./quiz-user";

export const initModels = () => {
  // User
  UserModel.belongsToMany(QuizModel, {
    through: QuizUserModel,
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  // Quiz
  QuizModel.belongsToMany(UserModel, {
    through: QuizUserModel,
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  // Question
  QuizModel.hasMany(QuestionModel);
  QuestionModel.belongsTo(QuizModel);

  // Option
  QuestionModel.hasMany(OptionModel);
  OptionModel.belongsTo(QuestionModel);

  // Result
  ResultModel.hasMany(ResultDetailsModel);
  ResultDetailsModel.belongsTo(ResultModel);
};
