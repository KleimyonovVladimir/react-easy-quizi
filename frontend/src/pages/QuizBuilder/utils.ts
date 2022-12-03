import { IQuestion } from 'api/swaggerGeneratedApi'
import { IFormQuestion } from 'types/quiz'

export const questionsMapping = (questions: IFormQuestion[]): IQuestion[] => {
  return questions.map(item => {
    const { answers } = item

    const answersName = answers.reduce<{ [key: string]: string }>((acc, cur, index) => {
      return { ...acc, [String(index)]: cur.answer }
    }, {})

    const rightAnswers = answers.reduce<number[]>(
      (acc, cur, index) => (cur.isRightAnswer ? [...acc, index] : acc),
      []
    )

    return { ...item, answers: answersName, rightAnswers }
  })
}
