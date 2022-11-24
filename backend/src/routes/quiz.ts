import Router from "express";
import { Model } from "sequelize";
import { QuizField } from "../models/quiz";
import { IUser, UserField } from "../models/user";
import { QuestionField } from "../models/question";
import { QuizUserField } from "../models/quiz-user";
import { QuizRepository } from "../repositories/quiz";
import { UserRepository } from "../repositories/user";
import { ResultRepository } from "../repositories/result";
import { UserQuizRepository } from "../repositories/user-quiz";
import { Question, QuestionDB, Quiz } from "../types";
import { clearAnswersInQuiz } from "../utils/removeAnswersFromQuiz";
import { isModerator } from "../middleware/is-moderator";

const router = Router();

const quizRepository = new QuizRepository();
const userRepository = new UserRepository();
const resultRepository = new ResultRepository();
const userQuizRepository = new UserQuizRepository();

router.get("/quizzes", async (req, res) => {
  try {
    // Getting all quizzes
    const quizzes = await quizRepository.getAll();

    // Return status 200 and quizzes back to the client
    res
      .status(200)
      .send(quizzes.map((quiz) => clearAnswersInQuiz(quiz.toJSON())));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/quizzes/create", isModerator, async (req, res) => {
  const { title, time, questions } = req.body;
  const { user } = req || {};

  const userId = (user as IUser)?.[UserField.Uid];

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

router.delete("/quizzes/delete/:id/", isModerator, async (req, res) => {
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

router.post("/quizzes/result/send", async (req, res) => {
  try {
    const { uid: quizId, questions } = req.body as Quiz;
    const { user } = req || {};

    const userId = (user as IUser)?.[UserField.Uid];

    const foundedUser = await userRepository.findByPk(userId);
    const foundedQuiz = await quizRepository.findByPk(quizId);

    if (foundedUser && foundedQuiz) {
      // GET or INSERT the association in quiz-users table
      const quizUserIds =
        (await userQuizRepository.getOne({
          [QuizUserField.UserId]: userId,
          [QuizUserField.QuizId]: quizId,
        })) || (await (foundedQuiz as any)?.addUser(foundedUser))[0];

      const quiz = foundedQuiz.toJSON() as Quiz<QuestionDB>;

      const score = questions.reduce((acc, userQuestion) => {
        const [question] = quiz.questions
          .map((item) => (item as unknown as Model<QuestionDB>)?.toJSON())
          .filter(
            (item) => item.uid === userQuestion.uid
          ) as unknown as Question[];

        const rightAnswers = question.rightAnswers || [];
        const userAnswers = userQuestion?.rightAnswers || [];

        if (
          rightAnswers.length === 1 &&
          userAnswers.length === 1 &&
          userAnswers[0] === rightAnswers[0]
        ) {
          return acc + 1;
        }

        if (rightAnswers.length > 1) {
          const joint = userAnswers.filter((answer) =>
            rightAnswers.includes(answer)
          );
          return acc + joint.length / rightAnswers.length;
        }

        return acc;
      }, 0);

      resultRepository.create({
        score: `${(score / quiz.questions.length) * 100}%`,
        quizUserId: quizUserIds.toJSON().uid,
      });

      res
        .status(200)
        .send({ score: `${(score / quiz.questions.length) * 100}%` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
