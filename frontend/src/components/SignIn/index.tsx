import { FC } from 'react'
import { Button } from '@mui/material'

import Input from 'components/Input'

import './styles.scss'

const mainCssClass = 'form'

const SignIn: FC = () => {
  return (
    <div className={`${mainCssClass}-login`}>
      <h2 className={`${mainCssClass}-login-title`}>Sign in</h2>
      <div className={`${mainCssClass}-inputs-container`}>
        <Input label="Email" type="text" name="email" placeholder="Enter your email" />
        <Input label="Password" type="password" name="password" placeholder="Enter your password" />
      </div>
      <Button type="submit" fullWidth variant="contained">
        Login
      </Button>
    </div>
  )
}

export default SignIn
