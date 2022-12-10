import { UserModel } from "./user";
import { QuizField, QuizModel } from "./quiz";
import { QuestionField, QuestionModel } from "./question";
import { QuizUserModel } from "./quiz-user";
import { ResultModel } from "./results";

export const initModels = async () => {
  // User
  UserModel.belongsToMany(QuizModel, {
    through: QuizUserModel,
    onUpdate: "cascade",
  });

  // Quiz
  QuizModel.belongsToMany(UserModel, {
    through: QuizUserModel,
    onUpdate: "cascade",
  });

  QuizModel.belongsTo(UserModel, { as: "createdBy", foreignKey: { name: QuizField.CreatedById, allowNull: false } });

  // Question
  QuizModel.hasMany(QuestionModel, {
    onDelete: "cascade",
    onUpdate: "cascade",
    foreignKey: { name: QuestionField.QuizId, allowNull: false },
  });
  QuestionModel.belongsTo(QuizModel, { foreignKey: { name: QuestionField.QuizId, allowNull: false } });

  ResultModel.belongsTo(QuizModel);
  ResultModel.belongsTo(UserModel);

  await UserModel.sync();
  await QuizModel.sync();
  await QuestionModel.sync();
  await ResultModel.sync();
};
