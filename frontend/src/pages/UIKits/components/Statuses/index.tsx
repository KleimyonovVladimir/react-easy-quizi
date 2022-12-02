import { Typography } from '@mui/material'
import { userStatues } from 'constants/status'

import { Status } from 'components/Status'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const Statuses: React.FC = () => {
  return (
    <div className={`${mainCssClass}-group`}>
      <Typography variant="h5">Statuses</Typography>
      <div className={`${mainCssClass}-group__items`}>
        <Status status={userStatues.admin} />
        <Status status={userStatues.teacher} />
        <Status status={userStatues.student} />
      </div>
    </div>
  )
}
