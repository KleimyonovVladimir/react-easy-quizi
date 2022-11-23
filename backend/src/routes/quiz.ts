import Router, { Request } from "express";
import { isUserStudent } from "../helpers/isUserStudent";
import { QuizField } from "../models/quiz";
import { IUser, UserField } from "../models/user";
import { QuestionField } from "../models/question";
import { QuizRepository } from "../repositories/quiz";
import { UserRepository } from "../repositories/user";
import { Question } from "../types";

const router = Router();

const quizRepository = new QuizRepository();
const userRepository = new UserRepository();

router.get("/quizzes", async (req, res) => {
  try {
    // Getting all quizzes
    const quizzes = await quizRepository.getAll();

    // Return status 200 and quizzes back to the client
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/quizzes/create", async (req, res) => {
  const { title, time, questions } = req.body;
  const { user } = req || {};

  const userId = (user as IUser)?.[UserField.Uid];

  if (isUserStudent(user as IUser))
    return res.status(400).send("Student can not create quiz");
  if (!title) return res.status(400).send("Title for the quiz are required");
  if (!time) return res.status(400).send("Time for the quiz are required");

  try {
    // Checking is quiz with this title already exist
    const foundedQuiz = await quizRepository.getOne({
      [QuizField.Title]: title,
    });
    if (foundedQuiz)
      res.status(400).send(`Quiz with this title '${title}' is already exist`);

    // 1. Creating new quiz
    const newQuiz = await quizRepository.create({
      ...req.body,
      [QuizField.CreatedBy]: userId,
      questions: (questions || []).map((question: Question) => ({
        [QuestionField.QuestionJSON]: JSON.stringify(question),
      })),
    });

    // 2. Find the User row
    const foundedUser = await userRepository.findByPk(userId);

    // 3. INSERT the association in quiz-users table
    await (newQuiz as any)?.addUser(foundedUser);

    // Return status 200 and new quiz back to the client
    res.status(200).send(newQuiz?.toJSON());
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/quizzes/delete/:id/", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    if (!id) return res.status(400).send("ID is required");

    const foundedQuiz = await quizRepository.getOne({
      [QuizField.Uid]: id,
    });

    if (foundedQuiz) {
      await quizRepository.delete({ [QuizField.Uid]: id });

      res.sendStatus(200);
    } else {
      res.status(400).send(`No quiz with id: ${id}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
