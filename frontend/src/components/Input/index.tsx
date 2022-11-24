import { FC } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

import './styles.scss'

const mainCssClass = 'input'

const Input: FC<TextFieldProps> = ({ label, InputLabelProps, ...props }) => {
  return (
    <div>
      {Boolean(label) && <label className={`${mainCssClass}-name`}>{label}:</label>}
      <TextField InputLabelProps={{ shrink: false, ...InputLabelProps }} {...props} />
    </div>
  )
}

export default Input
