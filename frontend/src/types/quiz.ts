export interface IAnswer {
  answer: string
  isRightAnswer: boolean
}

export interface IFormQuestion {
  question: string
  answers: IAnswer[]
}

export interface IQuizValues {
  title: string
  time: string
  questions: IFormQuestion[]
}
