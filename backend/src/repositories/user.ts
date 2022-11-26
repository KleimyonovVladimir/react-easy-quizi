import { WhereOptions } from "sequelize";
import { UserModel, IUser } from "../models/user";
import { SequelizePagination } from "../types";

export class UserRepository {
  async create(user: IUser, withReturnUser: boolean = true) {
    await UserModel.create(user);

    if (withReturnUser) {
      return await this.getOne({ email: user.email });
    }
  }

  getOne(conditions?: WhereOptions<IUser>) {
    return UserModel.findOne({
      where: conditions,
    });
  }

  async getAll(pagination: SequelizePagination) {
    return {
      total: await UserModel.count(),
      data: await UserModel.findAll({
        ...pagination,
      }),
    };
  }

  findByPk(primaryKey?: string) {
    return UserModel.findByPk(primaryKey);
  }
}
