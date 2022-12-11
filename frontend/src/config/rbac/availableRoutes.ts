import { adminRoutes } from 'config/routesByRole/adminRoutes'
import { studentRoutes } from 'config/routesByRole/studentRoutes'
import { teacherRoutes } from 'config/routesByRole/teacherRoutes'
import { UsersStatuses } from 'constants/status'

const roleRoutes: Record<UsersStatuses, string[]> = {
  [UsersStatuses.Admin]: adminRoutes,
  [UsersStatuses.Teacher]: teacherRoutes,
  [UsersStatuses.Student]: studentRoutes
}

export const getAvailableRoutes = (role: UsersStatuses): string[] => roleRoutes[role]
