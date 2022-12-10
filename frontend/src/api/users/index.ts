import { IUser, IUserCreate } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'
import { IResponse } from 'types/api'

export const getUsers = async (): Promise<IResponse<IUser>> => {
  const response = await client.get('/users')
  return response.data
}

export const createUsers = async (user: IUserCreate): Promise<IUser> => {
  const response = await client.post('/users/create', user)
  return response.data
}
