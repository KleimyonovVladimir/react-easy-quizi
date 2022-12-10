import { DestroyOptions, FindOptions } from "sequelize";
import { UserModel, IUser } from "../models/user";
import { SequelizePagination } from "../types";

export class UserRepository {
  async create(user: IUser, withReturnUser: boolean = true) {
    await UserModel.create(user);

    if (withReturnUser) {
      return await this.getOne({ where: { email: user.email } });
    }
  }

  async getOne(query?: FindOptions<IUser>) {
    return await UserModel.findOne(query);
  }

  async getAll(pagination: SequelizePagination) {
    return {
      total: await UserModel.count(),
      data: await UserModel.findAll({
        ...pagination,
        paranoid: false,
      }),
    };
  }

  findByPk(primaryKey?: string) {
    return UserModel.findByPk(primaryKey);
  }

  async delete(conditions: DestroyOptions<IUser>) {
    return await UserModel.destroy(conditions);
  }
}
