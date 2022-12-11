import { FC, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { getAvailableRoutes } from 'config/rbac/availableRoutes'
import { AppNavigationRoutes } from 'constants/paths'
import { UsersStatuses } from 'constants/status'
import { useAuthContext } from 'context/AuthContext'

import { IProps } from './type'

export const ProtectedRoute: FC<IProps> = ({ permission, children }) => {
  const { user } = useAuthContext()

  const hasAccess = useMemo(() => {
    if (!user) {
      return false
    }

    if (permission) {
      const routes = getAvailableRoutes(user.status as UsersStatuses)
      return routes.includes(permission)
    }
    return false
  }, [user, permission])

  return hasAccess ? <>{children}</> : <Navigate to={AppNavigationRoutes.Error403} replace />
}
