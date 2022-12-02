import { Typography } from '@mui/material'

import { Loader } from 'components/Loader'

import '../../styles.scss'

const mainCssClass = 'ui-kits'

export const Loaders: React.FC = () => {
  return (
    <div className={`${mainCssClass}-group`}>
      <Typography variant="h5">Loaders</Typography>
      <div className={`${mainCssClass}-group__items`}>
        <Loader size="24px" />
        <Loader size="40px" />
      </div>
    </div>
  )
}
