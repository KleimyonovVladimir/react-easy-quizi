import { FC, useState } from 'react'
import { Button } from '@mui/material'

import Input from 'components/Input'

import './styles.scss'

const mainCssClass = 'form'

const SignIn: FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const buttonClickHandler = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })
      const result = await response.json()
      console.log('🚀 ~ buttonClickHandler ~ result', result)
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
