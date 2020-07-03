import React from 'react'
import type { FC } from 'react'
import PlayerSelect from './PlayerSelect'
import ThemeToggle from './ThemeToggle'
import { Stack, Box } from '@chakra-ui/core'

const ControlPanel: FC = () => {
  return (
    <Stack isInline spacing={8} alignItems="flex-end">
      <Box flex={1}>
        <PlayerSelect />
      </Box>
      <ThemeToggle />
    </Stack>
  )
}

export default ControlPanel
