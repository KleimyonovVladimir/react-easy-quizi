import { ILoginRequest, IUser } from 'api/swaggerGeneratedApi'
import axios from 'axios'

const LOGIN_URL = 'http://localhost:4000/login'
const LOGOUT_URL = 'http://localhost:4000/logout'

export const login = async (credentials: ILoginRequest): Promise<IUser> => {
  const response = await axios.post(LOGIN_URL, credentials, { withCredentials: true })
  return response.data
}

export const logout = async (): Promise<void> => {
  await axios.post(LOGOUT_URL)
}
