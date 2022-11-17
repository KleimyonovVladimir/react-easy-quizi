import { createTheme } from '@mui/material'

import colors from 'styles/variables/_colors.module.scss'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          background: colors.darkBlue,
          textTransform: 'initial',
          fontWeight: 500,
          padding: '17px 0',
          boxShadow: 'none',
          transition: 'all 0.1s ease',

          '&:hover': {
            background: colors.darkBlue,
            opacity: 0.8,
            boxShadow: 'none'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',

          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `0.6px solid ${colors.darkGrey}`
          },

          '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary': {
            border: `0.6px solid ${colors.darkGrey}`
          }
        }
      }
    }
  }
})
