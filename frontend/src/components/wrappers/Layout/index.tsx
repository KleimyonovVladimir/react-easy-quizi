import { FC } from 'react'

import { AppHeader } from 'components/AppHeader'
import { Sidebar } from 'components/Sidebar'

import { IProps } from './type'

import './styles.scss'

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="application">
      <Sidebar />
      <div className="wrapper">
        <AppHeader />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default Layout
