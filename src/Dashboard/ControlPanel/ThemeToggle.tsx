import React from 'react'
import type { FC } from 'react'
import { useColorMode, Button, Switch } from '@chakra-ui/core'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  )
}

export default ThemeToggle
