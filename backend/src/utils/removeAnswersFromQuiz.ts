import { Quiz } from "../types";

export const clearAnswersInQuiz = (quiz: Quiz) => {
  const quizCopy = { ...quiz };
  return {
    ...quizCopy,
    questions: quizCopy.questions.map((item: any) => {
      const { uid, question } = item.toJSON();

      question.rightAnswers = [];

      return { uid, question };
    }),
  };
};
