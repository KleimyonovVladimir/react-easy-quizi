import { FC, memo, ReactElement } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { FormControlLabel, Radio as MuiRadio, RadioGroup as MuiRadioGroup } from '@mui/material'
import classnames from 'classnames'

import { IProps, IRadioGroupProps } from './type'

import './styles.scss'

const mainCssClass = 'radio'

const Radio: FC<IProps> = props => {
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
        <MuiRadio
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

export default memo(Radio)

export const RadioGroup: FC<IRadioGroupProps> = props => {
  const { items, ...rest } = props
  return (
    <MuiRadioGroup {...rest}>
      {items.map(element => (
        <Radio
          size="small"
          key={`${element.value}-${element.label}`}
          value={element.value}
          label={element.label}
        />
      ))}
    </MuiRadioGroup>
  )
}

export const RadioControl = <T extends FieldValues>(
  props: UseControllerProps<T> & IRadioGroupProps
): ReactElement => {
  const { name, control, rules, ...restProps } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, ...restField } }) => <RadioGroup {...restField} {...restProps} />}
    />
  )
}
