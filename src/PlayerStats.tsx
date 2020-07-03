import React, { useState, ChangeEvent, useEffect } from 'react'
import type { FC } from 'react'
import recoil from 'recoil'
import { Select, FormControl, FormLabel } from '@chakra-ui/core'
import { playersSelector, playerStatsSelector, playerAtom } from './selectors'

const { useRecoilState, useRecoilValue } = recoil

const PlayerStats: FC = () => {
  const [player, setPlayer] = useRecoilState(playerAtom)
  const players = useRecoilValue(playersSelector)
  const { rounds, average, best } = useRecoilValue(playerStatsSelector)

  useEffect(() => {
    setPlayer(players[0])
  }, [])

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setPlayer(value)
  }

  return (
    <>
      <h1>Player stats</h1>
      <FormControl>
        <FormLabel htmlFor="player">Player</FormLabel>
        <Select id="player" value={player} onChange={handleChange}>
          {players.map((player) => (
            <option>{player}</option>
          ))}
        </Select>
      </FormControl>
      <p>{rounds} rounds played</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Best: {best}</p>
    </>
  )
}

export default PlayerStats
