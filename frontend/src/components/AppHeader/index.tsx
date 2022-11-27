import { FC } from 'react'
import { Button } from '@mui/material'
import { logout } from 'api/auth'
import { userStatues } from 'constants/status'
import { useAuthContext } from 'context/AuthContext'

import { Status } from 'components/Status'

import './styles.scss'

const mainCssClass = 'header'

export const AppHeader: FC = () => {
  const authContext = useAuthContext()

  const onClickLogOut = async (): Promise<void> => {
    await logout()
    authContext.authUserChangeHandler(null)
  }

  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-content`}>
        {authContext.user?.fullName}
        {authContext.user?.status != null && (
          <Status
            className={`${mainCssClass}-content__status`}
            status={userStatues[authContext.user.status]}
          />
        )}
      </div>
      <div className={`${mainCssClass}-logout`}>
        <Button size="small" type="submit" fullWidth variant="outlined" onClick={onClickLogOut}>
          Log out
        </Button>
      </div>
    </div>
  )
}
