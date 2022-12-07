import { IResult } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'

export const getScore = async (): Promise<IResult[]> => {
  const response = await client.post('/quizzes/results')
  return response.data
}
