import { DestroyOptions, Sequelize, WhereOptions } from "sequelize";
import { IQuiz, QuizField, QuizModel } from "../models/quiz";
import { QuestionModel, QuestionField } from "../models/question";
import { Quiz, SequelizePagination } from "../types";
import { UserModel } from "../models/user";
import { clearAnswersInQuiz } from "../utils/removeAnswersFromQuiz";

export const includeQuestion = {
  model: QuestionModel,
  attributes: [QuestionField.Uid, QuestionField.QuestionJSON],
};

export class QuizRepository {
  async create(quiz: Quiz, withReturn: boolean = true) {
    await QuizModel.create(quiz, { include: [QuestionModel] });

    if (withReturn) {
      return await this.getOne({ [QuizField.Title]: quiz[QuizField.Title] });
    }
  }

  findByPk(primaryKey?: string) {
    return QuizModel.findByPk(primaryKey, { include: [includeQuestion] });
  }

  async getOne(conditions?: WhereOptions<IQuiz>) {
    return await QuizModel.findOne({
      where: conditions,
      include: [
        { model: UserModel, as: "createdBy" },
        { model: QuestionModel, attributes: [] },
      ],
    });
  }

  async getQuizById(quizId: string) {
    return QuizModel.findOne({
      where: { [QuizField.Uid]: quizId },
    });
  }

  async getQuizDetails(quizId: string, senderId?: string) {
    const quiz = await QuizModel.findOne({
      where: { [QuizField.Uid]: quizId },
      attributes: {
        include: [QuizField.Uid, QuizField.Title, QuizField.Time, QuizField.CreatedById],
      },
      include: [
        { model: UserModel, as: "createdBy" },
        { model: QuestionModel, attributes: [QuestionField.Uid, QuestionField.QuestionJSON] },
      ],
    });

    if (!quiz) return undefined;

    return clearAnswersInQuiz(quiz.toJSON(), senderId);
  }

  async getQuizzesWithPaginationAndQuestionCount(pagination: SequelizePagination) {
    return {
      total: await QuizModel.count(),
      data: await QuizModel.findAll({
        attributes: {
          include: [
            QuizField.Uid,
            QuizField.Title,
            QuizField.Time,
            QuizField.CreatedById,
            [Sequelize.fn("COUNT", Sequelize.col("questions.uid")), "questionsCount"],
          ],
        },
        include: [
          { model: UserModel, as: "createdBy" },
          { model: QuestionModel, attributes: [] },
        ],
        group: ["Quiz.uid"],
        ...pagination,
      }),
    };
  }

  async delete(conditions: DestroyOptions<IQuiz>) {
    return await QuizModel.destroy(conditions);
  }
}
