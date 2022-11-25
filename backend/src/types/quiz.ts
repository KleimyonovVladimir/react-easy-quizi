export interface Question {
  uid?: string;
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

export interface Quiz<T = Question> extends BaseQuiz {
  uid?: string;
  questions: Array<T>;
}
