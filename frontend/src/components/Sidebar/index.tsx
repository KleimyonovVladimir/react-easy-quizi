import { FC } from 'react'
import { List, ListItem } from '@mui/material'
import { menuItems } from 'constants/index'

import { Logo } from 'components/Logo'
import MenuLink from 'components/MenuLink'

import './styles.scss'

const mainCssClass = 'sidebar'

export const Sidebar: FC = () => {
  const menuLinkClasses = {
    li: `${mainCssClass}-item`,
    link: `${mainCssClass}-link`
  }

  const listStyles = {
    width: '100%',
    display: 'grid',
    gridRowGap: 30
  }

  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-wrapper`}>
        <Logo className={`${mainCssClass}-logo`} />
        <div className={`${mainCssClass}-list`}>
          <List sx={listStyles} component="nav">
            {menuItems.map((item, index) => (
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
