import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Button, ButtonProps, Tooltip } from '@mui/material'

const commonIconButtonSx = {
  minWidth: 'auto',
  padding: '8px 9px'
}

const commonIconSx = {
  width: '22px',
  height: '22px'
}

export const RefreshButton: React.FC<ButtonProps> = React.memo(props => {
  const { sx, ...rest } = props

  return (
    <Tooltip title="Refresh" enterDelay={500} leaveDelay={200}>
      <Button size="small" variant="outlined" sx={{ ...commonIconButtonSx, ...sx }} {...rest}>
        <RefreshIcon sx={commonIconSx} />
      </Button>
    </Tooltip>
  )
})

export const RemoveButton: React.FC<ButtonProps> = React.memo(props => {
  const { sx, ...rest } = props

  return (
    <Tooltip title="Delete" enterDelay={500} leaveDelay={200}>
      <Button
        size="small"
        variant="outlined"
        color="error"
        sx={{ ...commonIconButtonSx, ...sx }}
        {...rest}
      >
        <DeleteOutlineIcon sx={commonIconSx} />
      </Button>
    </Tooltip>
  )
})

export const AddButton: React.FC<ButtonProps> = React.memo(props => {
  const { sx, ...rest } = props

  return (
    <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
      <Button size="small" variant="outlined" sx={{ ...commonIconButtonSx, ...sx }} {...rest}>
        <AddCircleOutlineIcon sx={commonIconSx} />
      </Button>
    </Tooltip>
  )
})

export const EditButton: React.FC<ButtonProps> = React.memo(props => {
  const { sx, ...rest } = props

  return (
    <Tooltip title="Edit" enterDelay={500} leaveDelay={200}>
      <Button size="small" variant="outlined" sx={{ ...commonIconButtonSx, ...sx }} {...rest}>
        <ModeEditOutlineIcon sx={commonIconSx} />
      </Button>
    </Tooltip>
  )
})
