import { mean, min } from 'lodash-es'
import recoil from 'recoil'
import type { PlayerStats } from 'src/types'
import { filteredRoundsSelector } from '.'

const { selector } = recoil

export default selector<PlayerStats>({
  key: 'playerStats',
  get: ({ get }) => {
    const rounds = get(filteredRoundsSelector)
    const scores = rounds.map(({ toPar }) => toPar)

    return {
      rounds: rounds.length,
      average: mean(scores),
      best: min(scores) || 0,
    }
  },
})
