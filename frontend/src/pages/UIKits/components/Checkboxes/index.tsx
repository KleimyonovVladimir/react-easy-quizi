import { Typography } from '@mui/material'

import Checkbox from 'components/Checkbox'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const Checkboxes: React.FC = () => {
  return (
    <div className={`${mainCssClass}-group`}>
      <Typography variant="h5">Checkboxes</Typography>
      <div className={`${mainCssClass}-group__items`}>
        <Checkbox checked size="small" label="Small" />
        <Checkbox />
        <Checkbox disabled checked />
        <Checkbox defaultChecked label="With label" />
        <Checkbox label="Error" error />
      </div>
    </div>
  )
}
