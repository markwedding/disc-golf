import React from 'react'
import type { FC } from 'react'
import { Box, Divider } from '@chakra-ui/core'
import ControlPanel from './ControlPanel'
import PlayerStats from './PlayerStats'
import BestRounds from './BestRounds'

const Dashboard: FC = () => (
  <Box m={5}>
    <ControlPanel />
    <Divider my={5} />
    <PlayerStats />
    <Divider my={5} />
    <BestRounds />
  </Box>
)

export default Dashboard
