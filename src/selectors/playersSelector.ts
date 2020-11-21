import recoil from 'recoil'
import roundsQuery from './roundsQuery'

const { selector } = recoil

export default selector({
  key: 'players',
  get: ({ get }) => {
    const rounds = get(roundsQuery)

    return [...new Set(rounds.map(({ player }) => player))]
  },
})
