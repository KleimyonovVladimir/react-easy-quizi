import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import QuizIcon from '@mui/icons-material/Quiz'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import StarsIcon from '@mui/icons-material/Stars'

import { AppNavigationRoutes } from './paths'
import { UsersStatuses } from './status'

interface IMenuItems {
  title: string
  link: string
  icon: JSX.Element
  roles: UsersStatuses[]
}

export const menuItems: IMenuItems[] = [
  {
    title: 'Quizzes',
    link: AppNavigationRoutes.Quizzes,
    icon: <QuizIcon />,
    roles: [UsersStatuses.Admin, UsersStatuses.Teacher, UsersStatuses.Student]
  },
  {
    title: 'Users',
    link: AppNavigationRoutes.Users,
    icon: <PeopleAltIcon />,
    roles: [UsersStatuses.Admin]
  },
  {
    title: 'Score',
    link: AppNavigationRoutes.Score,
    icon: <StarsIcon />,
    roles: [UsersStatuses.Admin, UsersStatuses.Teacher, UsersStatuses.Student]
  },
  {
    title: 'UI Kits',
    link: AppNavigationRoutes.UIKits,
    icon: <SmartButtonIcon />,
    roles: []
  }
]
