import { WhereOptions } from "sequelize";
import { QuizField, QuizModel } from "../models/quiz";

import { IResult, ResultField, ResultModel } from "../models/results";
import { UserField, UserModel } from "../models/user";
import { removeEmptyFields } from "../utils/removeEmptyFields";

export const includeUser = {
  model: UserModel,
  attributes: [UserField.Uid, UserField.Email, UserField.FullName],
};

export const includeQuiz = {
  model: QuizModel,
  attributes: [QuizField.Uid, QuizField.Title, QuizField.CreatedBy],
};
export class ResultRepository {
  async create(resultBody: IResult, withReturnUser: boolean = true) {
    const result = await ResultModel.create(resultBody);

    if (withReturnUser) {
      return await this.getOne({
        [ResultField.Uid]: result?.toJSON()[ResultField.Uid],
      });
    }
  }

  findByPk(primaryKey?: string) {
    return ResultModel.findByPk(primaryKey);
  }

  getAll(conditions?: WhereOptions<IResult>) {
    return ResultModel.findAll({
      where: removeEmptyFields(conditions),
      include: [includeUser, includeQuiz],
    });
  }

  getOne(conditions?: WhereOptions<IResult>) {
    return ResultModel.findOne({
      where: conditions,
      include: [includeUser, includeQuiz],
    });
  }
}
