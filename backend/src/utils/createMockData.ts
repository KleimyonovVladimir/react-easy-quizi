import { mockUsers } from "../mocks/users";
import { IUser } from "../models/user";
import { UserRepository } from "../repositories/user";
import { SequelizePagination } from "../types";

const userRepository = new UserRepository();

export const generateUserToDB = async (paging: SequelizePagination) => {
  const users = await userRepository.getAll(paging);

  if (users.data.length === 1) {
    return await Promise.all(
      (mockUsers as IUser[]).map(async (element) => {
        await userRepository.create(element, false);
      })
    );
  }
};
