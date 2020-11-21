import recoil from 'recoil'
import { fetchRounds } from 'src/data'

const { selector } = recoil

export default selector({
  key: 'roundsQuery',
  get: async () => fetchRounds(),
})
