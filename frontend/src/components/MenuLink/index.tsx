import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { IProps } from './type'

const MenuLink: FC<IProps> = ({ icon, title, link, classes }) => {
  return (
    <li className={classes?.li}>
      <NavLink to={link} className={classes?.link}>
        {icon}
        {title}
      </NavLink>
    </li>
  )
}

export default MenuLink
