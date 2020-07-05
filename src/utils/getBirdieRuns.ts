import type { BirdieRun, Round } from 'src/types'
import isBirdieRun from './isBirdieRun'

const getBirdieRuns = (round: Round): BirdieRun[] => {
  const scores = round.holes.map(({ toPar }) => toPar < 0)
  let runs: Omit<BirdieRun, 'round'>[] = []

  scores.forEach((isBirdie, i) => {
    const set = scores.slice(0, i + 1)

    if (!isBirdieRun(set)) return

    runs.push({
      start: i + 2 - set.length,
      end: i + 1,
      run: set,
    })
  })

  return runs.map((run) => ({ ...run, round }))
}

export default getBirdieRuns
