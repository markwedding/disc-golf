import React from 'react'
import type { FC } from 'react'
import { Box, Divider, Stack } from '@chakra-ui/core'
import ControlPanel from './ControlPanel'
import PlayerStats from './PlayerStats'
import SortedRounds from './SortedRounds'
import BirdieRuns from './BirdieRuns'

const Dashboard: FC = () => (
  <Box m={5}>
    <ControlPanel />
    <Divider my={5} />
    <PlayerStats />
    <Divider my={5} />
    {/* TODO: figure out why Stack doesn't work here? */}
    <Stack isInline spacing={5}>
      <SortedRounds />
      <BirdieRuns />
    </Stack>
  </Box>
)

export default Dashboard
