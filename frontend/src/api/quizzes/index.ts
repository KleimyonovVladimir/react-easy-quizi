import { IQuiz } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'
import { IResponse } from 'types/api'

export const getQuizzes = async (): Promise<IResponse<IQuiz>> => {
  const response = await client.get('/quizzes')
  return response.data
}
