import { FC, memo, ReactElement } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import classnames from 'classnames'

import { IProps } from './types'

import './styles.scss'

const mainCssClass = 'checkbox'

export const Checkbox: FC<IProps> = props => {
  const { label, className, error, ...restProps } = props

  return (
    <FormControlLabel
      className={classnames(`${mainCssClass}-label-wrap`, className)}
      classes={{
        label: classnames({
          [`${mainCssClass}-label-text`]: !!label,
          [`${mainCssClass}-label-text__error`]: error
        })
      }}
      label={label ?? ''}
      control={
        <MuiCheckbox
          color={error ? 'error' : 'primary'}
          classes={{
            root: classnames(`${mainCssClass}-root`, { [`${mainCssClass}-root__error`]: error })
          }}
          {...restProps}
        />
      }
    />
  )
}

export default memo(Checkbox)

export const CheckboxControl = <T extends FieldValues>(
  props: UseControllerProps<T> & IProps
): ReactElement => {
  const { name, control, rules, ...restProps } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: restProps.required, ...rules }}
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <Checkbox {...restField} {...restProps} inputRef={ref} error={!!error} />
      )}
    />
  )
}
