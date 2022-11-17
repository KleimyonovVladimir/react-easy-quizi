import { FC } from 'react'

import logo from 'assets/logo.svg'

import './styles.scss'

const mainCssClass = 'logo'

export const Logo: FC = () => {
  return (
    <div className={`${mainCssClass}-box`}>
      <img src={logo} className={`${mainCssClass}-img`} alt="Logo" />
    </div>
  )
}
