import { AppHeaderSkeleton } from '../AppHeaderSkeleton'
import { SidebarSkeleton } from '../SidebarSkeleton'

import './styles.scss'

const mainCssClass = 'appLayoutSkeleton'

export const AppLayoutSkeleton: React.FC = () => {
  return (
    <div className={`${mainCssClass}-application`}>
      <SidebarSkeleton />
      <div className={`${mainCssClass}-wrapper`}>
        <AppHeaderSkeleton />
        <div className={`${mainCssClass}-content`} />
      </div>
    </div>
  )
}
