import { FC } from 'react'
import { Dialog, DialogTitle } from '@mui/material'

import { Loader } from 'components/Loader'

import './styles.scss'

const mainCssClass = 'loading-modal'

export const LoadingModal: FC = () => {
  return (
    <Dialog open maxWidth="xs" classes={{ paper: `${mainCssClass}-dialog` }}>
      <DialogTitle id="loading-modal-title" className={`${mainCssClass}-title`}>
        Please wait
      </DialogTitle>
      <div className={`${mainCssClass}-loader`}>
        <Loader />
      </div>
    </Dialog>
  )
}
