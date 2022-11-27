import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import QuizIcon from '@mui/icons-material/Quiz'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import StarsIcon from '@mui/icons-material/Stars'

import { AppNavigationRoutes } from './paths'

export const menuItems = [
  {
    title: 'Quizzes',
    link: AppNavigationRoutes.Quizzes,
    icon: <QuizIcon />
  },
  {
    title: 'Users',
    link: AppNavigationRoutes.Users,
    icon: <PeopleAltIcon />
  },
  {
    title: 'Score',
    link: AppNavigationRoutes.Score,
    icon: <StarsIcon />
  },
  {
    title: 'UI Kits',
    link: AppNavigationRoutes.UIKits,
    icon: <SmartButtonIcon />
  }
]
