import { FC } from 'react'
import { Button } from '@mui/material'
import { useAuthContext } from 'context/AuthContext'

import './styles.scss'

const mainCssClass = 'header'

export const AppHeader: FC = () => {
  const authContext = useAuthContext()

  const onClickLogOut = async (): Promise<void> => {
    try {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      authContext.authUserChangeHandler(null)
    } catch (error) {
      console.log('🚀 ~ buttonClickHandler ~ error', error)
    }
  }

  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-content`}>{authContext.user?.fullName}</div>
      <div className={`${mainCssClass}-logout`}>
        <Button size="small" type="submit" fullWidth variant="outlined" onClick={onClickLogOut}>
          Log out
        </Button>
      </div>
    </div>
  )
}
