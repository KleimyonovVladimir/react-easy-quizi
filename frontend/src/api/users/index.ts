import { IUser } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'
import { IResponse } from 'types/api'

export const getUsers = async (): Promise<IResponse<IUser>> => {
  const response = await client.get('/users')
  return response.data
}
