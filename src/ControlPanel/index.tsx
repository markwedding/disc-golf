import React from 'react'
import type { FC } from 'react'
import PlayerSelect from './PlayerSelect'
import ThemeToggle from './ThemeToggle'

const ControlPanel: FC = () => {
  return (
    <>
      <p>Control Panel</p>
      <PlayerSelect />
      <ThemeToggle />
    </>
  )
}

export default ControlPanel
