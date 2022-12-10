import { Op } from "sequelize";
import { isRequestFromAdmin, isRequestFromTeacher } from "../../helpers/isRequestFrom";
import { QuizField, QuizModel } from "../../models/quiz";
import { ResultField, ResultModel } from "../../models/results";
import { IUser } from "../../models/user";

const resultsIdsForUser = async (userUid?: string) => {
  if (!userUid) {
    return [];
  }

  const resultsUsers = await ResultModel.findAll({
    where: { userUid },
  });

  return resultsUsers.map((results) => results.toJSON()[ResultField.Uid]);
};

const resultsIdsForTeacherQuizzes = async (userUid?: string) => {
  if (!userUid) {
    return [];
  }

  const teachersQuizzes = await QuizModel.findAll({ where: { [QuizField.CreatedById]: userUid } });
  return teachersQuizzes.map((results) => results.toJSON()[QuizField.Uid]);
};

const searchQueryForRequest = async (user: IUser) => {
  const userId = user.uid;

  const allowedToViewAllResults = isRequestFromAdmin(user);
  const allowedToViewByCreatedQuizzes = isRequestFromTeacher(user);

  if (allowedToViewAllResults) {
    return {};
  }

  if (allowedToViewByCreatedQuizzes) {
    const resultsIdsForQuiz = await resultsIdsForTeacherQuizzes(userId);
    return {
      where: {
        [ResultField.QuizUid]: {
          [Op.in]: resultsIdsForQuiz,
        },
      },
    };
  }

  const resultsIds = await resultsIdsForUser(userId);
  return {
    where: {
      [ResultField.Uid]: {
        [Op.in]: resultsIds,
      },
    },
  };
};

export default {
  searchQueryForRequest,
};