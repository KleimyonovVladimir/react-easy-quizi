import { WhereOptions } from "sequelize";
import { IQuizUser, QuizUserModel } from "../models/quiz-user";

export class UserQuizRepository {
  getOne(conditions?: WhereOptions<IQuizUser>) {
    return QuizUserModel.findOne({
      where: conditions,
    });
  }
}
