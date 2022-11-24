import { UserModel } from "./user";
import { QuizModel } from "./quiz";
import { ResultModel } from "./results";
import { ResultDetailsModel } from "./resultDetails";
import { QuestionModel } from "./question";
import { QuizUserModel } from "./quiz-user";

export const initModels = async () => {
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
  QuizModel.hasMany(QuestionModel, {
    onDelete: "cascade",
    onUpdate: "cascade",
  });
  QuestionModel.belongsTo(QuizModel);

  // Result
  ResultModel.hasMany(ResultDetailsModel);
  ResultDetailsModel.belongsTo(ResultModel);

  await UserModel.sync();
  await QuizModel.sync();
  await QuestionModel.sync();
};
