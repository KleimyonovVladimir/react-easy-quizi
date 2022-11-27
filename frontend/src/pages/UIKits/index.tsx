import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Typography } from '@mui/material'
import { userStatues } from 'constants/status'

import { Loader } from 'components/Loader'
import { Status } from 'components/Status'

import './styles.scss'

const mainCssClass = 'ui-kits'

const UIKits: React.FC = () => {
  return (
    <div>
      <div className={`${mainCssClass}-group`}>
        <Typography variant="h5">Buttons</Typography>
        <div className={`${mainCssClass}-group__items`}>
          <Button size="small" variant="contained">
            Contained button
          </Button>
          <Button size="small" variant="outlined">
            Outlined button
          </Button>
          <Button size="small" disableRipple>
            Text button
          </Button>
          <LoadingButton size="small" variant="contained" loading>
            Loading button
          </LoadingButton>
        </div>
      </div>
      <div className={`${mainCssClass}-group`}>
        <Typography variant="h5">Loaders</Typography>
        <div className={`${mainCssClass}-group__items`}>
          <Loader size="24px" />
          <Loader size="40px" />
        </div>
      </div>

      <div className={`${mainCssClass}-group`}>
        <Typography variant="h5">Statuses</Typography>
        <div className={`${mainCssClass}-group__items`}>
          <Status status={userStatues.admin} />
          <Status status={userStatues.teacher} />
          <Status status={userStatues.student} />
        </div>
      </div>
    </div>
  )
}

export default UIKits
