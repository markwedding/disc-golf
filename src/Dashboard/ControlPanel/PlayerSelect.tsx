import React, { ChangeEvent, useEffect } from 'react'
import type { FC } from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/core'
import recoil from 'recoil'
import { playerAtom, playersSelector } from 'src/state'

const { useRecoilState, useRecoilValue } = recoil

const PlayerSelect: FC = () => {
  const [player, setPlayer] = useRecoilState(playerAtom)
  const players = useRecoilValue(playersSelector)

  useEffect(() => {
    setPlayer(players[0])
  }, [])

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setPlayer(value)
  }

  return (
    <FormControl>
      <FormLabel htmlFor="player">Player</FormLabel>
      <Select id="player" value={player} onChange={handleChange}>
        {players.map((player) => (
          <option>{player}</option>
        ))}
      </Select>
    </FormControl>
  )
}

export default PlayerSelect
