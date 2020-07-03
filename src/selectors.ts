import recoil from 'recoil'
import fetchRounds from './fetchRounds'

const { selector } = recoil

const roundsQuery = selector({
  key: 'rounds',
  get: async () => fetchRounds(),
})

export { roundsQuery }
