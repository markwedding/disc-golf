import React from 'react'
import type { FC } from 'react'
import PlayerSelect from './PlayerSelect'
import ThemeToggle from './ThemeToggle'
import { Stack, Box } from '@chakra-ui/core'
import CourseSelect from './CourseSelect'

const ControlPanel: FC = () => {
  return (
    <>
      <Stack isInline spacing={8} alignItems="flex-end">
        <Box flex={1}>
          <PlayerSelect />
        </Box>
        <ThemeToggle />
      </Stack>
      <CourseSelect />
    </>
  )
}

export default ControlPanel
