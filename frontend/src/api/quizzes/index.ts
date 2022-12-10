import { ICreateQuiz, IQuiz, IQuizResult, IResult } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'
import { IResponse } from 'types/api'

export const getQuizzes = async (): Promise<IResponse<IQuiz>> => {
  const response = await client.get('/quizzes')
  return response.data
}

export const createQuizzes = async (quiz: ICreateQuiz): Promise<void> => {
  await client.post('/quizzes/create', quiz)
}

export const deleteQuiz = async (id: string): Promise<void> => {
  await client.delete(`/quizzes/${id}`)
}

export const getQuiz = async (id: string): Promise<IQuiz> => {
  const response = await client.get(`/quizzes/details/${id}`)
  return response.data
}

export const sendQuizAnswers = async (quizAnswers: IQuizResult): Promise<IResult> => {
  const response = await client.post('/quizzes/result/send', quizAnswers)
  return response.data
}
