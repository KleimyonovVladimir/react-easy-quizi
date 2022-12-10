import Router from "express";
import { isAdmin } from "../middleware/is-moderator";
import { IUser, UserField, UserModel } from "../models/user";
import { UserRepository } from "../repositories/user";
import { Pagination } from "../types";
import { generateUserToDB } from "../utils/createMockData";
import { parsePagination } from "../utils/parsePagination";

const router = Router();

const userRepository = new UserRepository();

router.post("/users/create", isAdmin, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Email and password are required");

  try {
    // Checking is user with this email already exist
    const foundedUser = await userRepository.getOne({ where: { email } });
    if (foundedUser) {
      return res.status(400).send(`User with this email '${email}' is already exist`);
    }

    // Creating new user
    const newUser = await userRepository.create(req.body);

    // @TODO change to newUser?.toJSON().uid
    // Return status 200 and user back to the client
    res.status(200).send(newUser?.toJSON());
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users", isAdmin, async (req, res) => {
  try {
    const { page, pageSize } = req.query as Pagination;
    const paging = parsePagination({ page, pageSize });

    // @TMP Add mock users for developing (Remove in the future)
    await generateUserToDB(paging);

    // Getting all users
    const users = await userRepository.getAll(paging);

    // Return status 200 and users back to the client
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      where: { [UserField.Uid]: id },
    };

    const user = await userRepository.getOne(query);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const senderId = (req.user as IUser)[UserField.Uid];

    const user = await UserModel.findOne({
      where: { [UserField.Uid]: userId },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { email, status } = req.body;

    if (email) {
      return res.status(400).send("Cannot update email address");
    }

    if (status) {
      if (userId === senderId) {
        return res.status(400).send("Users cannot update their own role");
      }
    }

    const updatedUser = await user?.update(req.body);
    return res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    const query = {
      where: { [UserField.Uid]: userId },
    };

    // Check if user exist
    const user = await userRepository.getOne(query);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await userRepository.delete(query);

    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
