import Router from "express";
import { isAdmin } from "../middleware/is-moderator";
import { UserRepository } from "../repositories/user";
import { generateUserToDB } from "../utils/createMockData";

const router = Router();

const userRepository = new UserRepository();

router.post("/users/create", isAdmin, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Email and password are required");

  try {
    // Checking is user with this email already exist
    const foundedUser = await userRepository.getOne({ email });
    if (foundedUser)
      res.status(400).send(`User with this email '${email}' is already exist`);

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
    // @TMP Add mock users for developing (Remove in the future)
    await generateUserToDB();

    // Getting all users
    const users = await userRepository.getAll();

    // Return status 200 and users back to the client
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
