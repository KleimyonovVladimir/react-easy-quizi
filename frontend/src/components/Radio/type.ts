import { RadioGroupProps, RadioProps } from '@mui/material'

export interface IProps extends RadioProps {
  label?: string
  error?: boolean
}

export interface IRadioGroupProps extends RadioGroupProps {
  items: Array<{
    value: string
    label: string
  }>
}
