import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { login } from 'api/auth'
import { useAuthContext } from 'context/AuthContext'

import { InputControl } from 'components/Input'

import { schema } from './validation'

import './styles.scss'

const mainCssClass = 'form'

interface IFormValues {
  email: string
  password: string
}

const SignIn: FC = () => {
  const authContext = useAuthContext()

  const { control, handleSubmit } = useForm<IFormValues>({
    resolver: yupResolver(schema),

    defaultValues: {
      email: '',
      password: ''
    }
  })

  const buttonClickHandler = handleSubmit(async (data): Promise<void> => {
    const response = await login(data)
    authContext.authUserChangeHandler(response)
  })

  return (
    <div className={`${mainCssClass}-login`}>
      <h2 className={`${mainCssClass}-login-title`}>Sign in</h2>
      <div className={`${mainCssClass}-inputs-container`}>
        <InputControl
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          size="medium"
          type="email"
        />
        <InputControl
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          size="medium"
          type="password"
        />
      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={`${mainCssClass}-login-button`}
        onClick={buttonClickHandler}
      >
        Login
      </Button>
    </div>
  )
}

export default SignIn
