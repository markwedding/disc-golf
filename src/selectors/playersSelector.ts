import recoil from 'recoil'
import { roundsQuery } from '.'

const { selector } = recoil

export default selector({
  key: 'players',
  get: ({ get }) => {
    const rounds = get(roundsQuery)

    return [...new Set(rounds.map(({ player }) => player))]
  },
})
