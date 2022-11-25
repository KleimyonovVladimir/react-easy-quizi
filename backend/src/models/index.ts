import { UserModel } from "./user";
import { QuizModel } from "./quiz";
import { QuestionModel } from "./question";
import { QuizUserModel } from "./quiz-user";
import { ResultModel } from "./results";

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

  ResultModel.belongsTo(QuizModel);
  ResultModel.belongsTo(UserModel);

  await UserModel.sync();
  await QuizModel.sync();
  await QuestionModel.sync();
  await ResultModel.sync();
};
