import { FC } from 'react'
import { Skeleton } from '@mui/material'

import './styles.scss'

const mainCssClass = 'signInSkeleton'

export const SignInSkeleton: FC = () => {
  return (
    <>
      <Skeleton className={`${mainCssClass}-logo`} variant="rectangular" width={160} height={45} />
      <div className={`${mainCssClass}-content`}>
        <div className={`${mainCssClass}-container`}>
          <div className={`${mainCssClass}-login`}>
            <Skeleton variant="rectangular" width={120} height={30} sx={{ marginBottom: '40px' }} />
            <div className={`${mainCssClass}-inputs-container`}>
              <div>
                <Skeleton
                  variant="rectangular"
                  width={46}
                  height={15}
                  sx={{ marginBottom: '15px' }}
                />
                <Skeleton variant="rectangular" width={425} height={60} />
              </div>
              <div>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={15}
                  sx={{ marginBottom: '15px' }}
                />
                <Skeleton variant="rectangular" width={425} height={60} />
              </div>
            </div>
            <Skeleton variant="rectangular" width={425} height={60} />
          </div>
        </div>
        <div className={`${mainCssClass}-bg-container`}>
          <div className={`${mainCssClass}-intro`}>
            <div className={`${mainCssClass}-bg-image-wrap`}>
              <Skeleton variant="rectangular" width={600} height={610} />
            </div>
            <Skeleton variant="rectangular" width={415} height={50} sx={{ marginBottom: '15px' }} />
            <Skeleton variant="rectangular" width={370} height={20} />
          </div>
        </div>
      </div>
    </>
  )
}
