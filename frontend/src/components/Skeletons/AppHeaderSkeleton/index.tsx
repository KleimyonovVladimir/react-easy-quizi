import { FC } from 'react'
import { Skeleton } from '@mui/material'

import './styles.scss'

const mainCssClass = 'appHeaderSkeleton'

export const AppHeaderSkeleton: FC = () => {
  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-content`}>
        <Skeleton variant="rectangular" width={150} height={10} />
        <Skeleton
          className={`${mainCssClass}-content__status`}
          variant="rectangular"
          width={100}
          height={35}
        />
      </div>
      <Skeleton variant="rectangular" width={90} height={44} />
    </div>
  )
}
