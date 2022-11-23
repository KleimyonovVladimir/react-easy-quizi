import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/paths'

import { AppHeader } from 'components/AppHeader'
import { Sidebar } from 'components/Sidebar'

import { IProps } from './type'

import './styles.scss'

const notRenderOnRoutes = [AppNavigationRoutes.SignIn]

const AppNavigation: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation()

  return notRenderOnRoutes.includes(pathname) ? (
    <>{children}</>
  ) : (
    <div className="application">
      <Sidebar />
      <div className="wrapper">
        <AppHeader />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default AppNavigation
