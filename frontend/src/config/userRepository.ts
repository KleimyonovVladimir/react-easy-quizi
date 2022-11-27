import { IUser } from 'api/swaggerGeneratedApi'

const KEY = 'authUser'

interface IUserRepository {
  getUser: () => IUser | null
  setUser: (user: IUser) => void
  removeUser: () => void
}

export const createUserRepository = (): IUserRepository => ({
  getUser: () => {
    const user = localStorage.getItem(KEY)

    return user ? JSON.parse(user) : null
  },
  setUser: user => {
    localStorage.setItem(KEY, JSON.stringify(user))
  },
  removeUser: () => {
    localStorage.removeItem(KEY)
  }
})

export const userRepository = createUserRepository()
