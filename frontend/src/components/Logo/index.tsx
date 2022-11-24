import { FC } from 'react'
import { ReactComponent as LogoSvg } from 'assets/logo.svg'

import { IProps } from './type'

import './styles.scss'

const mainCssClass = 'logo'

export const Logo: FC<IProps> = ({ color = 'white', className }) => {
  return (
    <div className={className}>
      <LogoSvg fill={color} className={`${mainCssClass}-img`} />
    </div>
  )
}
