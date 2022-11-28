import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import { ReactComponent as AttentionIcon } from 'assets/icons/attention.svg'

import { IProps } from './types'

import './styles.scss'

const mainCssClass = 'confirm-dialog'

const ConfirmModal: FC<IProps> = ({ title, text, onConfirm, onClose }) => {
  return (
    <Dialog maxWidth="lg" classes={{ paper: `${mainCssClass}-dialog` }} open onClose={onClose}>
      <div className={`${mainCssClass}-paper`}>
        <AttentionIcon />
        <div className={`${mainCssClass}-content`}>
          <DialogTitle id="confirm-dialog-title" className={`${mainCssClass}-title`}>
            {title ?? 'Confirm'}
          </DialogTitle>

          {text && (
            <Typography variant="body2" id="confirm-dialog-description">
              {text}
            </Typography>
          )}
        </div>
      </div>

      <DialogActions className={`${mainCssClass}-buttons`}>
        <Button size="small" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
