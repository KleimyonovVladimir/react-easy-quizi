import { FC } from 'react'
import { List, Skeleton } from '@mui/material'

import './styles.scss'

const mainCssClass = 'sidebarSkeleton'

export const SidebarSkeleton: FC = () => {
  return (
    <div className={`${mainCssClass}`}>
      <div className={`${mainCssClass}-wrapper`}>
        <Skeleton
          className={`${mainCssClass}-logo`}
          variant="rectangular"
          width={160}
          height={35}
        />
        <List className={`${mainCssClass}-list`} component="nav">
          <Skeleton
            className={`${mainCssClass}-list__item`}
            variant="rectangular"
            width={130}
            height={20}
          />
          <Skeleton
            className={`${mainCssClass}-list__item`}
            variant="rectangular"
            width={100}
            height={20}
          />
          <Skeleton
            className={`${mainCssClass}-list__item`}
            variant="rectangular"
            width={110}
            height={20}
          />
        </List>
      </div>
    </div>
  )
}
