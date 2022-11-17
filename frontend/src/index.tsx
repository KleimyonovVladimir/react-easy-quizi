import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'

import App from './App'

import { theme } from 'theme'

import './styles/common.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
