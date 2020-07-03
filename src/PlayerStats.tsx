import React from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { playerStatsSelector } from './selectors'

const { useRecoilValue } = recoil

const PlayerStats: FC = () => {
  const { rounds, average, best } = useRecoilValue(playerStatsSelector)

  return (
    <>
      <p>{rounds} rounds played</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Best: {best}</p>
    </>
  )
}

export default PlayerStats
