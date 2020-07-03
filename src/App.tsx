import React, { Suspense } from 'react'
import recoil from 'recoil'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './theme'
import Dashboard from './Dashboard'

const { RecoilRoot } = recoil

const App = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Dashboard />
        </ColorModeProvider>
      </ThemeProvider>
    </Suspense>
  </RecoilRoot>
)

export default App
