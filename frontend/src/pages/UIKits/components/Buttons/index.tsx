import { LoadingButton } from '@mui/lab'
import { Button, Typography } from '@mui/material'

import { AddButton, EditButton, RefreshButton, RemoveButton } from 'components/WrappedButtons'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const Buttons: React.FC = () => {
  return (
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
        <div className={`${mainCssClass}-subgroup`}>
          <Typography variant="subtitle1">Icon Buttons</Typography>
          <div className={`${mainCssClass}-group__items`}>
            <RefreshButton />
            <RemoveButton />
            <EditButton />
            <AddButton />
          </div>
        </div>
      </div>
    </div>
  )
}
