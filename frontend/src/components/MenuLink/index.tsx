import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { IProps } from './type'

const MenuLink: FC<IProps> = ({ title, link, classes }) => {
  return (
    <li className={classes?.li}>
      <NavLink to={link} className={classes?.link}>
        {title}
      </NavLink>
    </li>
  )
}

export default MenuLink
