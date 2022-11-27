import { memo } from 'react'
import classnames from 'classnames'

import { IProps } from './types'

import './styles.scss'

const mainCssClass = 'status'

export const Status: React.FC<IProps> = memo(({ status, className }) => {
  return (
    <div
      style={{ background: status.color.background, color: status.color.color }}
      className={classnames(`${mainCssClass}`, className)}
    >
      {status.name}
    </div>
  )
})
