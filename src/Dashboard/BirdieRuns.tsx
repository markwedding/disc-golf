import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { Box } from '@chakra-ui/core'
import { birdieRunsSelector } from 'src/selectors'

const { useRecoilValue } = recoil

const BirdieRuns: FC = () => {
  const birdieRuns = useRecoilValue(birdieRunsSelector)

  return (
    <Box>
      <p>Birdie Runs</p>
    </Box>
  )
}

export default BirdieRuns
