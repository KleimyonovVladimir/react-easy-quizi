import { FC, ReactElement } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { FormControl, FormHelperText, TextField } from '@mui/material'

import { IProps } from './types'

import './styles.scss'

const mainCssClass = 'input'

const Input: FC<IProps> = ({ label, InputLabelProps, error, errorMessage, ...props }) => {
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

export const InputControl = <T extends FieldValues>(
  props: UseControllerProps<T> & IProps
): ReactElement => {
  const { name, control, rules, ...restProps } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: restProps.required,
        pattern: restProps.forbiddenCharactersRegExp,
        ...rules
      }}
      render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
        <Input
          {...restField}
          {...restProps}
          inputRef={ref}
          value={value || ''}
          error={!!error}
          errorMessage={error?.message}
        />
      )}
    />
  )
}

export default Input
