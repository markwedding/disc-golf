import React, { Suspense } from 'react'
import recoil from 'recoil'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Divider,
  Box,
} from '@chakra-ui/core'
import customTheme from './theme'
import ControlPanel from './ControlPanel'
import PlayerStats from './PlayerStats'

const { RecoilRoot } = recoil

const App = () => (
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Box m={5}>
            <ControlPanel />
            <Divider my={5} />
            <PlayerStats />
            <Divider my={5} />
          </Box>
        </ColorModeProvider>
      </ThemeProvider>
    </Suspense>
  </RecoilRoot>
)

export default App
