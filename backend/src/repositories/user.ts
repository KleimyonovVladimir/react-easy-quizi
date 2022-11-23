import { WhereOptions } from "sequelize";
import { UserModel, IUser } from "../models/user";

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

  getAll() {
    return UserModel.findAll();
  }

  findByPk(primaryKey?: string) {
    return UserModel.findByPk(primaryKey);
  }
}
