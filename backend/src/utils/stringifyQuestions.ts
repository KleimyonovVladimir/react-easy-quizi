import { QuestionField } from "../models/question";
import { Question } from "../types";

export const stringifyQuestions = (questions: Question[]) => {
  return (questions || []).map((question: Question) => ({
    [QuestionField.QuestionJSON]: JSON.stringify(question),
  }));
};
