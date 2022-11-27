import { IStatus } from 'types/status'

import colors from 'styles/variables/_colors.module.scss'

export const statusColor = {
  purple: { background: colors.lightPurple, color: colors.white },
  pink: { background: colors.darkPink, color: colors.white },
  green: { background: colors.lightGreen, color: colors.darkGrey }
}

export const userStatues: Record<string, IStatus> = {
  admin: {
    name: 'Admin',
    color: statusColor.pink
  },
  teacher: {
    name: 'Teacher',
    color: statusColor.purple
  },
  student: {
    name: 'Student',
    color: statusColor.green
  }
}
