import { WhereOptions } from "sequelize";
import { IQuiz, QuizField, QuizModel } from "../models/quiz";
import { QuestionModel, QuestionField } from "../models/question";
import { UserModel, UserField } from "../models/user";
import { Quiz, SequelizePagination } from "../types";

export const includeUser = {
  model: UserModel,
  attributes: [UserField.Uid, UserField.Email, UserField.FullName],
};

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

  getOne(conditions?: WhereOptions<IQuiz>) {
    return QuizModel.findOne({
      where: conditions,
      include: [includeQuestion],
    });
  }

  async getAll(pagination: SequelizePagination) {
    return {
      total: await QuizModel.count(),
      data: await QuizModel.findAll({
        attributes: [
          QuizField.Uid,
          QuizField.Title,
          QuizField.Time,
          QuizField.CreatedBy,
        ],
        ...pagination,
      }),
    };
  }

  delete(conditions: WhereOptions<IQuiz>) {
    return QuizModel.destroy({
      where: conditions,
    });
  }
}
