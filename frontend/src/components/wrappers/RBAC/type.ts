import { UsersStatuses } from 'constants/status'

export interface IProps {
  allowedRoles: UsersStatuses[]
  children: React.ReactNode
}
