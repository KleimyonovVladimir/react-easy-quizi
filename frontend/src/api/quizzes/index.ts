import { ICreateQuiz, IQuiz } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'
import { IResponse } from 'types/api'

export const getQuizzes = async (): Promise<IResponse<IQuiz>> => {
  const response = await client.get('/quizzes')
  return response.data
}

export const createQuizzes = async (quiz: ICreateQuiz): Promise<void> => {
  await client.post('/quizzes/create', quiz)
}
