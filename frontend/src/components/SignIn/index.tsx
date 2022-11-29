import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { login } from 'api/auth'
import { useAuthContext } from 'context/AuthContext'

import Input from 'components/Input'

import { schema } from './validation'

import './styles.scss'

const mainCssClass = 'form'

interface IFormValues {
  email: string
  password: string
}

const SignIn: FC = () => {
  const authContext = useAuthContext()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),

    defaultValues: {
      email: '',
      password: ''
    }
  })

  const buttonClickHandler = handleSubmit(async (data): Promise<void> => {
    console.log(data)
    const response = await login(data)
    authContext.authUserChangeHandler(response)
  })

  return (
    <div className={`${mainCssClass}-login`}>
      <h2 className={`${mainCssClass}-login-title`}>Sign in</h2>
      <div className={`${mainCssClass}-inputs-container`}>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              inputRef={ref}
              label="Email"
              type="text"
              placeholder="Enter your email"
              error={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Input
              {...field}
              inputRef={ref}
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={Boolean(errors.password)}
              errorMessage={errors.password?.message}
            />
          )}
        />
      </div>
      <Button type="submit" fullWidth variant="contained" onClick={buttonClickHandler}>
        Login
      </Button>
    </div>
  )
}

export default SignIn
