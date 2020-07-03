import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { Text } from '@chakra-ui/core'
import { playerStatsSelector } from './selectors'
import { formatAverageToPar, formatToPar } from './utils'

const { useRecoilValue } = recoil

const PlayerStats: FC = () => {
  const { rounds, average, best } = useRecoilValue(playerStatsSelector)

  return (
    <>
      <Text fontSize="lg">
        <Text fontWeight="bold" as="span">
          {rounds}
        </Text>{' '}
        rounds played
      </Text>
      <Text fontSize="lg">
        Average:{' '}
        <Text fontWeight="bold" as="span">
          {formatAverageToPar(average)}
        </Text>
      </Text>
      <Text fontSize="lg">
        Best:{' '}
        <Text fontWeight="bold" as="span">
          {formatToPar(best)}
        </Text>
      </Text>
    </>
  )
}

export default PlayerStats
