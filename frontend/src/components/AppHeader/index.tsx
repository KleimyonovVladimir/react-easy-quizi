import { FC } from 'react'
import { Button } from '@mui/material'

import './styles.scss'

const mainCssClass = 'header'

export const AppHeader: FC = () => {
  const onClickLogOut = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      await response.json()
    } catch (error) {
      console.log('🚀 ~ buttonClickHandler ~ error', error)
    }
  }

  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-content`}>App Header</div>
      <div className={`${mainCssClass}-logout`}>
        <Button type="submit" fullWidth variant="contained" onClick={onClickLogOut}>
          Log out
        </Button>
      </div>
    </div>
  )
}
