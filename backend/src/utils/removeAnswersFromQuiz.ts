import { Question, Quiz } from "../types";

export const clearAnswersInQuiz = (quiz: Quiz) => {
  const quizCopy = { ...quiz };
  return {
    ...quizCopy,
    questions: quizCopy.questions.map((item: any) => {
      const question = item.toJSON() as Question;

      if (question.rightAnswers) {
        question.isMultiple = question.rightAnswers.length > 1;
      }
      delete question.rightAnswers;

      return question;
    }),
  };
};
