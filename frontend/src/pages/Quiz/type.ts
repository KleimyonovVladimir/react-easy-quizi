import { UseControllerProps } from 'react-hook-form'
import { IQuizQuestionAnswer } from 'api/swaggerGeneratedApi'

export interface IQuestionsValues {
  questions: IQuizQuestionAnswer[]
}

export interface IAnswers extends UseControllerProps<IQuestionsValues> {
  answers: {
    [key: string]: string
  }
}
