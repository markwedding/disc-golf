import { dropRightWhile, dropWhile } from 'lodash-es'
import type { BirdieRun, Round } from 'src/types'
import isBirdieRun from './isBirdieRun'

// const getBirdieRuns = (round: Round): BirdieRun[] => {
//   const scores = round.holes.map(({ toPar }) => toPar < 0)
//   let runs: Omit<BirdieRun, 'round'>[] = []

//   scores.forEach((isBirdie, i) => {
//     const set = scores.slice(0, i + 1)

//     if (!isBirdieRun(set)) return

//     runs.push({
//       start: i + 2 - set.length,
//       end: i + 1,
//       run: set,
//     })
//   })

//   return runs.map((run) => ({ ...run, round }))
// }

const getBirdieRuns = (round: Round): BirdieRun[] => {
  const scores = round.holes.map(({ toPar }) => toPar < 0)

  // remove misses from beginning and end
  const trimmedScores = dropWhile(
    dropRightWhile(scores, (v) => !v),
    (v) => !v,
  )

  // reduce scores to streaks and misses
  const rawStreaks = trimmedScores.reduce<number[]>((output, score, i) => {
    if (score !== trimmedScores[i - 1]) {
      output.push(0)
    }

    output[output.length - 1]++

    return output
  }, [])

  const streaks = []

  for (let i = 0; i < rawStreaks.length; i += 2) {
    streaks.push({
      misses: rawStreaks[i - 1] || 0,
      birdies: rawStreaks[i],
    })
  }

  console.log(scores)
  console.log(trimmedScores)
  console.log(rawStreaks)
  console.log(streaks)

  return []
}

export default getBirdieRuns
