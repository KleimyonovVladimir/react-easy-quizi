import { FC } from 'react'
import { List, ListItem } from '@mui/material'
import { menuItems } from 'constants/menuItems'
import { UsersStatuses } from 'constants/status'
import { useAuthContext } from 'context/AuthContext'

import { Logo } from 'components/Logo'
import MenuLink from 'components/MenuLink'

import './styles.scss'

const mainCssClass = 'sidebar'

export const Sidebar: FC = () => {
  const { user } = useAuthContext()

  if (!user) {
    return null
  }

  const menuLinkClasses = {
    li: `${mainCssClass}-item`,
    link: `${mainCssClass}-link`
  }

  const listStyles = {
    width: '100%',
    display: 'grid',
    gridRowGap: 30
  }

  const menuItemsByRole = menuItems.filter(item =>
    item.roles.includes(user.status as UsersStatuses)
  )

  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-wrapper`}>
        <Logo className={`${mainCssClass}-logo`} />
        <div className={`${mainCssClass}-list`}>
          <List sx={listStyles} component="nav">
            {menuItemsByRole.map((item, index) => (
              <ListItem key={`menu-item-${item.title}-${index}`} button>
                <MenuLink {...item} classes={menuLinkClasses} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}
