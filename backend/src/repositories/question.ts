import { WhereOptions } from "sequelize";
import { IQuestion, QuestionField, QuestionModel } from "../models/question";

export class QuestionRepository {
  async create(question: IQuestion) {
    return await QuestionModel.create(question);
  }

  getOne(conditions?: WhereOptions<IQuestion>) {
    return QuestionModel.findOne({
      where: conditions,
    });
  }

  getAll() {
    return QuestionModel.findAll();
  }

  async totalQuestionsCount(quizId: string) {
    if (!quizId) {
      return 0;
    }
    return QuestionModel.count({ where: { [QuestionField.QuizId]: quizId } });
  }
}
