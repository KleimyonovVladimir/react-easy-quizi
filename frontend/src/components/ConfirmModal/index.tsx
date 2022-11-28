import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { IProps } from './types'

const ConfirmModal: FC<IProps> = ({ title, onConfirm, onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
