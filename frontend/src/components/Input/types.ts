import { TextFieldProps } from '@mui/material'

export type IProps = TextFieldProps & {
  error?: boolean
  errorMessage?: string

  forbiddenCharactersRegExp?: RegExp
}
