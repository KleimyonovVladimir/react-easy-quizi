import { Op } from "sequelize";
import { isRequestFromRoleType } from "../../helpers/isRequestFrom";
import { QuizField, QuizModel } from "../../models/quiz";
import { ResultField, ResultModel } from "../../models/results";
import { IUser } from "../../models/user";
import { UserStatusEnums } from "../../types";

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

  const allowedToViewAllResults = isRequestFromRoleType(UserStatusEnums.Admin, user);
  const allowedToViewByCreatedQuizzes = isRequestFromRoleType(UserStatusEnums.Teacher, user);

  if (allowedToViewAllResults) {
    return {};
  }

  const resultsIds = await resultsIdsForUser(userId);

  if (allowedToViewByCreatedQuizzes) {
    const resultsIdsForQuiz = await resultsIdsForTeacherQuizzes(userId);
    return {
      where: {
        [Op.or]: [{ [ResultField.QuizUid]: { [Op.in]: resultsIdsForQuiz } }, { [ResultField.Uid]: { [Op.in]: resultsIds } }],
      },
    };
  }

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
