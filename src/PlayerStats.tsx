import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { Select } from '@chakra-ui/core'
import { roundsQuery } from './selectors'

const { useRecoilValue } = recoil

const PlayerStats: FC = () => {
  const rounds = useRecoilValue(roundsQuery)

  console.log(rounds)
  return (
    <>
      <p>Player stats</p>
      <Select>
        {[].map((player) => (
          <option>{player}</option>
        ))}
      </Select>
    </>
  )
}

export default PlayerStats
