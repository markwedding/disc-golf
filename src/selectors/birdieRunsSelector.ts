import recoil from 'recoil'
import { getBirdieRuns } from 'src/utils'
import filteredRoundsSelector from './filteredRoundsSelector'

const { selector } = recoil

export default selector({
  key: 'birdieRuns',
  get: ({ get }) => {
    const rounds = get(filteredRoundsSelector)

    if (rounds.length) {
      // TODO: remove
      const birdieRuns = getBirdieRuns(rounds[1])

      console.log('BIRDIE RUNS: ', birdieRuns)

      return birdieRuns
    }

    return []
  },
})
