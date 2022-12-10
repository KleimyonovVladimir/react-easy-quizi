import { Question, Quiz } from "../types";

export const clearAnswersInQuiz = (quiz: Quiz, senderId?: string) => {
  const quizCopy = { ...quiz };
  return {
    ...quizCopy,
    questions: quizCopy.questions.map((item: any) => {
      const question = item.toJSON() as Question;

      if (senderId !== quizCopy.createdById) {
        delete question.rightAnswers;
      }

      return question;
    }),
  };
};
