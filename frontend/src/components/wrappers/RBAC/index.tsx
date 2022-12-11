import { FC } from 'react'
import { UsersStatuses } from 'constants/status'
import { useAuthContext } from 'context/AuthContext'

import { IProps } from './type'

const RBAC: FC<IProps> = ({ allowedRoles, children }) => {
  const { user } = useAuthContext()

  if (user && allowedRoles.includes(user.status as UsersStatuses)) {
    return <>{children}</>
  }

  return null
}

export default RBAC
