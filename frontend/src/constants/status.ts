import { IStatus } from 'types/status'

import colors from 'styles/variables/_colors.module.scss'

export const statusColor = {
  purple: { background: colors.lightPurple, color: colors.white },
  pink: { background: colors.darkPink, color: colors.white },
  green: { background: colors.lightGreen, color: colors.darkGrey }
}

export enum UsersStatuses {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student'
}

export const userStatus: Record<string, IStatus> = {
  [UsersStatuses.Admin]: {
    name: 'Admin',
    color: statusColor.pink
  },
  [UsersStatuses.Teacher]: {
    name: 'Teacher',
    color: statusColor.purple
  },
  [UsersStatuses.Student]: {
    name: 'Student',
    color: statusColor.green
  }
}
