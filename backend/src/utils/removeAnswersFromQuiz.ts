import { Question, Quiz } from "../types";

export const clearAnswersInQuiz = (quiz: Quiz) => {
  const quizCopy = { ...quiz };
  return {
    ...quizCopy,
    questions: quizCopy.questions.map((item: any) => {
      const question = item.toJSON() as Question;

      question.rightAnswers = [];

      return question;
    }),
  };
};
