import { createTheme } from '@mui/material'

import colors from 'styles/variables/_colors.module.scss'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16
  },
  palette: {
    primary: {
      main: colors.darkBlue
    }
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          r: 18,
          strokeWidth: 5
        },
        root: {
          color: colors.darkPink,
          borderRadius: '7px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'initial',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.1s ease',

          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          '&:hover': {
            opacity: 0.8
          }
        },
        text: {
          '&:hover': {
            background: 'transparent',
            color: colors.darkBlue,
            opacity: 0.6
          }
        },
        sizeSmall: {
          padding: '8px 16px'
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
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: '5px'
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            '&.Mui-focusVisible': {
              backgroundColor: 'inherit'
            }
          }
        },
        expandIconWrapper: {
          marginLeft: '12px'
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: 'grid',
          gridRowGap: '10px'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '20px'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
          padding: 0
        }
      }
    }
  }
})
