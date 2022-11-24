import { mockUsers } from "../mocks/users";
import { IUser } from "../models/user";
import { UserRepository } from "../repositories/user";

const userRepository = new UserRepository();

export const generateUserToDB = async () => {
  const users = await userRepository.getAll();

  if (users.length === 1) {
    return await Promise.all(
      (mockUsers as IUser[]).map(async (element) => {
        await userRepository.create(element, false);
      })
    );
  }
};
