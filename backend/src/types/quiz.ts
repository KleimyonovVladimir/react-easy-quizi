export interface Question {
  question: string;
  answers: Record<number, string>;
  rightAnswers: Array<number>;
}

interface BaseQuiz {
  title: string;
  createdBy: string;
  time: string;
}

export interface QuestionDB {
  uid: string;
  questionJSON: string;
}

export interface QuizRequest<T = Question> extends BaseQuiz {
  questions: Array<T>;
}
