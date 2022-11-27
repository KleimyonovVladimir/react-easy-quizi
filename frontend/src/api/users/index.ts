import { IUser } from 'api/swaggerGeneratedApi'
import axios from 'axios'
import { IResponse } from 'types/api'

const URL = 'http://localhost:4000/users'

export const getUsers = async (): Promise<IResponse<IUser>> => {
  const response = await axios.get(URL, { withCredentials: true })
  return response.data
}
