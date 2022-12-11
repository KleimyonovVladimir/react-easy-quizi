import { Typography } from '@mui/material'
import { userStatus } from 'constants/status'

import { Status } from 'components/Status'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const Statuses: React.FC = () => {
  return (
    <div className={`${mainCssClass}-group`}>
      <Typography variant="h5">Statuses</Typography>
      <div className={`${mainCssClass}-group__items`}>
        <Status status={userStatus.admin} />
        <Status status={userStatus.teacher} />
        <Status status={userStatus.student} />
      </div>
    </div>
  )
}
