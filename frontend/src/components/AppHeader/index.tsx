import { FC } from 'react'

import './styles.scss'

const mainCssClass = 'header'

export const AppHeader: FC = () => {
  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-content`}>App Header</div>
    </div>
  )
}
