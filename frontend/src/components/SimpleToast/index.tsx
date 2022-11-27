import { Typography } from '@mui/material'

type Mode = 'success' | 'warning' | 'error'

export const SimpleToast = (description: string, type: Mode): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto'
      }}
    >
      <Typography
        variant="body2"
        style={{
          marginLeft: '10px',
          whiteSpace: 'break-spaces',
          fontWeight: 'normal'
        }}
      >
        {description}
      </Typography>
    </div>
  )
}
