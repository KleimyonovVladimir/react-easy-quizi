import { createContext, FC, useContext, useState } from 'react'
import { IUser } from 'api/swaggerGeneratedApi'
import { noop } from 'utils/noop'

interface IAuthContextProviderProps {
  children: React.ReactNode
}

interface IAuthContext {
  user: IUser | null
  authUserChangeHandler: (user: IUser | null) => void
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  authUserChangeHandler: noop
})

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
  const userLS = localStorage.getItem('authUser')

  const [authUser, setAuthUser] = useState<IUser | null>(userLS != null ? JSON.parse(userLS) : null)

  const authUserChangeHandler = (user: IUser | null): void => {
    setAuthUser(user)
    localStorage.setItem('authUser', JSON.stringify(user))
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
