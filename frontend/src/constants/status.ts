import { IStatus } from 'types/status'

export const statusColor = {
  purple: { background: '#806194', color: '#fff' },
  pink: { background: '#DF1674', color: '#fff' },
  green: { background: '#C2F970', color: '#333' }
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
