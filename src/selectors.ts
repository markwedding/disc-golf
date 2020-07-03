import recoil from 'recoil'
import fetchRounds from './fetchRounds'
import type { PlayerStats } from './types'
import { mean, min } from 'lodash-es'

const { atom, selector } = recoil

const playerAtom = atom<string | undefined>({
  key: 'player',
  default: undefined,
})

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

export { playerAtom, roundsQuery, playersSelector, playerStatsSelector }
