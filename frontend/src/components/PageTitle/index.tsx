import { FC, memo } from 'react'
import { Typography } from '@mui/material'

import { IProps } from './types'

const PageTitle: FC<IProps> = ({ title }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
  )
}

export default memo(PageTitle)
