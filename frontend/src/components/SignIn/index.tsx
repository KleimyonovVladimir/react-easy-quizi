import { FC, useState } from 'react'
import { Button } from '@mui/material'
import { login } from 'api/auth'
import { ILoginRequest } from 'api/swaggerGeneratedApi'
import { useAuthContext } from 'context/AuthContext'

import Input from 'components/Input'

import './styles.scss'

const mainCssClass = 'form'

const SignIn: FC = () => {
  const authContext = useAuthContext()

  const [credentials, setCredentials] = useState<ILoginRequest>({
    email: '',
    password: ''
  })

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const buttonClickHandler = async (): Promise<void> => {
    try {
      const response = await login(credentials)

      authContext.authUserChangeHandler(response)
    } catch (error) {
      console.log('🚀 ~ buttonClickHandler ~ error', error)
    }
  }

  return (
    <div className={`${mainCssClass}-login`}>
      <h2 className={`${mainCssClass}-login-title`}>Sign in</h2>
      <div className={`${mainCssClass}-inputs-container`}>
        <Input
          value={credentials.email}
          label="Email"
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={inputChangeHandler}
        />
        <Input
          value={credentials.password}
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={inputChangeHandler}
        />
      </div>
      <Button type="submit" fullWidth variant="contained" onClick={buttonClickHandler}>
        Login
      </Button>
    </div>
  )
}

export default SignIn
