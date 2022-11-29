import { FC } from 'react'
import { FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material'

import './styles.scss'

const mainCssClass = 'input'

type IInputProps = TextFieldProps & {
  error?: boolean
  errorMessage?: string
}

const Input: FC<IInputProps> = ({ label, InputLabelProps, error, errorMessage, ...props }) => {
  return (
    <FormControl error={error}>
      {Boolean(label) && <label className={`${mainCssClass}-name`}>{label}:</label>}
      <TextField InputLabelProps={{ shrink: false, ...InputLabelProps }} {...props} />
      {error && errorMessage && (
        <FormHelperText className={`${mainCssClass}-error-message`}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}

export default Input
