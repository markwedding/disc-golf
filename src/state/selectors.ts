import recoil from 'recoil'
import { fetchRounds } from '../data'
import type { PlayerStats } from '../types'
import { mean, min } from 'lodash-es'
import { playerAtom, roundSortAtom } from './atoms'

const { selector } = recoil

const roundsQuery = selector({
  key: 'roundsQuery',
  get: async () => fetchRounds(),
})

const playersSelector = selector({
  key: 'players',
  get: ({ get }) => {
    const rounds = get(roundsQuery)

    return [...new Set(rounds.map(({ player }) => player))]
  },
})

const roundsSelector = selector({
  key: 'rounds',
  get: ({ get }) => {
    const allRounds = get(roundsQuery)
    const player = get(playerAtom)

    return allRounds.filter((round) => round.player === player)
  },
})

const playerStatsSelector = selector<PlayerStats>({
  key: 'playerStats',
  get: ({ get }) => {
    const rounds = get(roundsSelector)
    const scores = rounds.map(({ toPar }) => toPar)

    return {
      rounds: rounds.length,
      average: mean(scores),
      best: min(scores) || 0,
    }
  },
})

const sortedRoundsSelector = selector({
  key: 'sortedRounds',
  get: ({ get }) => {
    const rounds = get(roundsSelector)
    const roundSort = get(roundSortAtom)
    // copying since .sort mutates the array 😑
    const roundsCopy = [...rounds]

    roundsCopy.sort((a, b) => {
      if (roundSort === 'asc') return a.toPar - b.toPar

      return b.toPar - a.toPar
    })

    // return top 10 rounds
    return roundsCopy.slice(0, 10)
  },
})

export {
  roundsQuery,
  roundsSelector,
  playersSelector,
  playerStatsSelector,
  sortedRoundsSelector,
}
