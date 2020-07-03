import React, { Suspense } from 'react'
import recoil from 'recoil'
import { ThemeProvider } from '@chakra-ui/core'
import customTheme from './theme'
import ControlPanel from './ControlPanel'
import PlayerStats from './PlayerStats'

// snowpack does not support CJS named exports
const { RecoilRoot } = recoil

const App = () => {
  return (
    <>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider theme={customTheme}>
            <ControlPanel />
            <PlayerStats />
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </>
  )
}

export default App
