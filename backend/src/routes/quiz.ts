import Router from "express";
import { Model } from "sequelize";
import { QuizField } from "../models/quiz";
import { IUser, UserField } from "../models/user";
import { QuestionField } from "../models/question";
import { QuizUserField } from "../models/quiz-user";
import { QuizRepository } from "../repositories/quiz";
import { UserRepository } from "../repositories/user";
import { includeQuiz, includeUser, ResultRepository } from "../repositories/result";
import { UserQuizRepository } from "../repositories/user-quiz";
import { Pagination, Question, QuestionDB, Quiz, QuizResult } from "../types";
import { isModerator } from "../middleware/is-moderator";
import { ResultField, ResultModel } from "../models/results";
import { parsePagination } from "../utils/parsePagination";
import { QuestionRepository } from "../repositories/question";

import QuizUtil from "./utils/quizFunctions";

const router = Router();

const quizRepository = new QuizRepository();
const userRepository = new UserRepository();
const resultRepository = new ResultRepository();
const userQuizRepository = new UserQuizRepository();
const questionRepository = new QuestionRepository();

router.get("/quizzes", async (req, res) => {
  try {
    const { page, pageSize } = req.query as Pagination;

    // Getting all quizzes
    const quizzes = await quizRepository.getQuizzesWithPaginationAndQuestionCount(parsePagination({ page, pageSize }));

    // Return status 200 and quizzes back to the client
    res.status(200).send({ ...quizzes, data: quizzes.data });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/quizzes/details/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const senderId = (req.user as IUser)[UserField.Uid];

    // Getting quiz
    const foundedQuiz = await quizRepository.getQuizDetails(quizId, senderId);

    if (!foundedQuiz) return res.status(400).send("Quiz not founded");

    const questionsCount = await questionRepository.totalQuestionsCount(quizId);

    // Return status 200 and quiz back to the client
    res.status(200).send({ ...foundedQuiz, questionsCount });
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
    const foundedQuiz = await quizRepository.getOne({ [QuizField.Title]: title });
    if (foundedQuiz) res.status(400).send(`Quiz with this title '${title}' is already exist`);

    // 1. Creating new quiz
    const newQuiz = await quizRepository.create({
      ...req.body,
      [QuizField.CreatedById]: userId,
      questions: (questions || []).map((question: Question) => ({
        [QuestionField.QuestionJSON]: JSON.stringify(question),
      })),
    });

    if (!newQuiz) return res.status(500).send("Could not create quiz");

    // 2. Find the User row
    const foundedUser = await userRepository.findByPk(userId);

    // 3. INSERT the association in quiz-users table
    await (newQuiz as any)?.addUser(foundedUser);

    const plainQuiz = newQuiz.get({ plain: true });

    const { [QuizField.Uid]: id } = plainQuiz;
    if (!id) return res.status(500).send("Could not get quiz id");

    const questionsCount = await questionRepository.totalQuestionsCount(id);

    // Return status 200 and new quiz back to the client
    res.status(200).send({ ...newQuiz.toJSON(), questionsCount });
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

router.post("/quizzes/results", async (req, res) => {
  try {
    const user = req.user as IUser;

    const where_query = await QuizUtil.searchQueryForRequest(user);
    const dbResults = await ResultModel.findAll({ ...where_query, include: [includeQuiz, includeUser] });

    res.status(200).send(dbResults);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/quizzes/result/send", async (req, res) => {
  try {
    const { quizId, questions } = req.body as QuizResult;
    const { user } = req || {};

    if (!quizId) return res.status(400).send("quizId is required");
    if (!questions) return res.status(400).send("questions is required");

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
          .filter((item) => item.uid === userQuestion.questionId) as unknown as Question[];

        const rightAnswers = question.rightAnswers || [];
        const userAnswers = userQuestion.userAnswers || [];

        if (rightAnswers.length === 1 && userAnswers.length === 1 && userAnswers[0] === rightAnswers[0]) {
          return acc + 1;
        }

        if (rightAnswers.length > 1) {
          const joint = userAnswers.filter((answer) => rightAnswers.includes(answer));
          return acc + joint.length / rightAnswers.length;
        }

        return acc;
      }, 0);

      const scoreInPercent = `${(score / quiz.questions.length) * 100}%`;

      const result = await resultRepository.create({
        [ResultField.Score]: scoreInPercent,
        [ResultField.UserUid]: quizUserIds.toJSON()[ResultField.UserUid],
        [ResultField.QuizUid]: quizUserIds.toJSON()[ResultField.QuizUid],
        [ResultField.FinishedAt]: new Date(),
      });

      res.status(200).send(result?.toJSON());
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
