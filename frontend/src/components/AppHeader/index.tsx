import { FC, useState } from 'react'
import { Button } from '@mui/material'
import { logout } from 'api/auth'
import { userStatues } from 'constants/status'
import { useAuthContext } from 'context/AuthContext'

import ConfirmModal from 'components/ConfirmModal'
import { Status } from 'components/Status'

import './styles.scss'

const mainCssClass = 'header'

export const AppHeader: FC = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const authContext = useAuthContext()

  const onClickLogOut = async (): Promise<void> => {
    await logout()
    authContext.authUserChangeHandler(null)
  }
  const handleConfirmDialog = (): void => {
    setConfirmModalOpen(prev => !prev)
  }

  return (
    <>
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
          <Button
            size="small"
            type="submit"
            fullWidth
            variant="outlined"
            onClick={handleConfirmDialog}
          >
            Log out
          </Button>
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          text="Are you sure to log out?"
          onClose={handleConfirmDialog}
          onConfirm={onClickLogOut}
        />
      )}
    </>
  )
}
