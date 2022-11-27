import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, ButtonProps } from '@mui/material'

const commonIconButtonSx = {
  minWidth: 'auto',
  padding: '8px 9px'
}

const commonIconSx = {
  width: '22px',
  height: '22px'
}

export const RefreshButton: React.FC<ButtonProps> = React.memo(props => {
  return (
    <Button size="small" variant="outlined" sx={commonIconButtonSx} {...props}>
      <RefreshIcon sx={commonIconSx} />
    </Button>
  )
})

export const RemoveButton: React.FC<ButtonProps> = React.memo(props => {
  return (
    <Button size="small" variant="outlined" color="error" sx={commonIconButtonSx} {...props}>
      <DeleteOutlineIcon sx={commonIconSx} />
    </Button>
  )
})

export const AddButton: React.FC<ButtonProps> = React.memo(props => {
  return (
    <Button size="small" variant="outlined" sx={commonIconButtonSx} {...props}>
      <AddCircleOutlineIcon sx={commonIconSx} />
    </Button>
  )
})

export const EditButton: React.FC<ButtonProps> = React.memo(props => {
  return (
    <Button size="small" variant="outlined" sx={commonIconButtonSx} {...props}>
      <ModeEditOutlineIcon sx={commonIconSx} />
    </Button>
  )
})
