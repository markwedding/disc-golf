import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { ThemeProvider } from '@chakra-ui/core'
import customTheme from './theme'

render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
