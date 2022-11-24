import { WhereOptions } from "sequelize";

import { IResult, ResultModel } from "../models/results";

export class ResultRepository {
  async create(result: IResult) {
    await ResultModel.create(result);
  }

  findByPk(primaryKey?: string) {
    return ResultModel.findByPk(primaryKey);
  }

  getOne(conditions?: WhereOptions<IResult>) {
    return ResultModel.findOne({
      where: conditions,
    });
  }
}
