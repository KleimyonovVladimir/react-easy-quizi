import { ILoginRequest, IUser } from 'api/swaggerGeneratedApi'
import { client } from 'config/client'

export const login = async (credentials: ILoginRequest): Promise<IUser> => {
  const response = await client.post('/login', credentials)
  return response.data
}

export const logout = async (): Promise<void> => {
  await client.post('/logout')
}
