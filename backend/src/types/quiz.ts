export interface Question {
  uid?: string;
  question: string;
  answers: Record<number, string>;
  isMultiple?: boolean;
  rightAnswers?: Array<number>;
  questionsCount?: number;
}

export interface UserQuestion {
  uid?: string;
  userAnswers: number[];
}

interface BaseQuiz {
  title: string;
  createdById: string;
  time: string;
}

export interface QuestionDB {
  uid: string;
  questionJSON: string;
}

export interface Quiz<T = Question> extends BaseQuiz {
  uid?: string;
  questions: Array<T>;
}
