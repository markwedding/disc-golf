import recoil from 'recoil'
import { fetchRounds } from '../data'
import type { PlayerStats } from '../types'
import { mean, min } from 'lodash-es'
import { playerAtom } from './atoms'

const { selector } = recoil

const roundsQuery = selector({
  key: 'rounds',
  get: async () => fetchRounds(),
})

const playersSelector = selector({
  key: 'players',
  get: ({ get }) => {
    const rounds = get(roundsQuery)

    return [...new Set(rounds.map(({ player }) => player))]
  },
})

const playerStatsSelector = selector<PlayerStats>({
  key: 'playerStats',
  get: ({ get }) => {
    const rounds = get(roundsQuery)
    const player = get(playerAtom)

    const roundsByPlayer = rounds.filter((round) => round.player === player)
    const scores = roundsByPlayer.map(({ toPar }) => toPar)

    return {
      rounds: roundsByPlayer.length,
      average: mean(scores),
      best: min(scores) || 0,
    }
  },
})

export { roundsQuery, playersSelector, playerStatsSelector }
