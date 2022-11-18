import { WhereOptions } from "sequelize";
import { IQuestion, QuestionModel } from "../models/question";

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
}
