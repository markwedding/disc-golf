import React, { Suspense } from 'react'
import recoil from 'recoil'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './theme'
import ControlPanel from './ControlPanel'
import PlayerStats from './PlayerStats'

// snowpack does not support CJS named exports
const { RecoilRoot } = recoil

const App = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <ControlPanel />
          <PlayerStats />
        </ColorModeProvider>
      </ThemeProvider>
    </Suspense>
  </RecoilRoot>
)

export default App
