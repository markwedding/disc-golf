import { dropRightWhile, dropWhile } from 'lodash-es'
import type { BirdieRun, PotentialRun, Round, Run } from 'src/types'
import isRun from './isRun'
import maybeAddRun from './maybeAddRun'
import updatePotentialRuns from './updatePotentialRuns'

interface RawStreak {
  hole: number
  count: number
}

/**
 * Returns an array of birdie runs from a given round.
 */
const getBirdieRuns = (round: Round): BirdieRun[] => {
  /**
   * Convert holes to scores
   *
   * `{ toPar: -1, ... }` => `{ birdie: true, hole: 1 }`
   */
  const scores = round.holes.map(({ toPar }, i) => ({
    birdie: toPar < 0,
    hole: i + 1,
  }))

  /**
   * Remove misses from beginning and end, as these are not relevant in
   * calculating birdie runs
   */
  const predicate = ({ birdie }: { birdie: boolean }) => !birdie
  const trimmedScores = dropWhile(dropRightWhile(scores, predicate), predicate)

  /**
   * Reduce scores to streaks and misses.
   *
   * true, true, false, false, true => 2, 2, 1
   */

  const rawStreaks = trimmedScores.reduce<RawStreak[]>(
    (output, { birdie, hole }, i) => {
      if (birdie !== trimmedScores[i - 1]?.birdie) {
        output.push({
          hole,
          count: 0,
        })
      }

      output[output.length - 1].count++

      return output
    },
    [],
  )

  /**
   * Convert raw streaks to an array of streaks with preceding misses.
   *
   * 2, 2, 1 =>
   * `[{ misses: 0, birdies: 2, ... }, { misses: 2, birdies: 1, ... }]`
   */

  const streaks = []

  for (let i = 0; i < rawStreaks.length; i += 2) {
    const { count, hole } = rawStreaks[i]

    streaks.push({
      misses: rawStreaks[i - 1]?.count || 0,
      birdies: count,
      start: hole,
    })
  }

  /**
   * Calculate birdie runs. Algorithm steps:
   *
   * Loop over each birdie streak:
   * 1) update and maybe remove potential runs carried over from the last streak
   * 2) add current streak to potential runs
   * 3) if any potential run is an actual run, add it to the outputs if it is
   *    good enough
   */
  let outputs: Run[] = []
  let potentialRuns: PotentialRun[] = []

  streaks.forEach(({ misses, birdies, start }) => {
    // update potential runs and remove if necessary
    potentialRuns = updatePotentialRuns({
      potentialRuns,
      misses,
      birdies,
    })

    // add current streak to potential runs
    potentialRuns.push({
      birdies,
      start,
      end: start + birdies - 1,
      holes: birdies,
    })

    // if any potential run is a run, maybe add to outputs
    for (const potentialRun of potentialRuns) {
      if (isRun(potentialRun)) {
        outputs = maybeAddRun(potentialRun, outputs)
      }
    }
  })

  /**
   * Map outputs to birdie runs and return
   *
   * TODO: remove console log statement and const declaration
   */
  const birdieRuns: BirdieRun[] = outputs.map(({ start, end, ...rest }) => ({
    round,
    start,
    end,
    ...rest,
    run: scores.slice(start - 1, end).map(({ birdie }) => birdie),
  }))

  console.log('birdieRuns: ', birdieRuns)

  return birdieRuns
}

export default getBirdieRuns
