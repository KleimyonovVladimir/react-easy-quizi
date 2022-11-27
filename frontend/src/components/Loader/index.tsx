import { CircularProgress, CircularProgressProps } from '@mui/material'

export const Loader: React.FC<CircularProgressProps> = props => {
  return <CircularProgress {...props} />
}
