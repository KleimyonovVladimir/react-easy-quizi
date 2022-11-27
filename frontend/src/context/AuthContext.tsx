import { createContext, FC, useContext, useState } from 'react'
import { IUser } from 'api/swaggerGeneratedApi'
import { userRepository } from 'config/userRepository'

interface IAuthContextProviderProps {
  children: React.ReactNode
}

interface IAuthContext {
  user: IUser | null
  authUserChangeHandler: (user: IUser | null) => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<IUser | null>(userRepository.getUser())

  const authUserChangeHandler = (user: IUser | null): void => {
    setAuthUser(user)

    user ? userRepository.setUser(user) : userRepository.removeUser()
  }

  return (
    <AuthContext.Provider value={{ user: authUser, authUserChangeHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

// Consumers

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error('useAuthContext should be used within a AuthContextProvider')
  }

  return context
}
