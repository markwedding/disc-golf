import { dropRightWhile, dropWhile } from 'lodash-es'
import type { BirdieRun, PotentialRun, Round } from 'src/types'
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

type UpdatePotentialRuns = (params: {
  potentialRuns: PotentialRun[]
  birdies: number
  misses: number
}) => PotentialRun[]

const updatePotentialRuns: UpdatePotentialRuns = ({
  potentialRuns,
  misses,
  birdies: newBirdies,
}) => {
  let i = potentialRuns.length
  const updatedPotentialRuns = []

  while (i--) {
    const { ...potentialRun } = potentialRuns[i]

    let { holes, birdies, end, start } = potentialRun

    // add misses
    holes += misses

    // determine if run should be ended
    if (holes - birdies >= 4) {
      return updatedPotentialRuns
    }

    // update properties
    holes += newBirdies
    birdies += newBirdies
    end += misses + newBirdies

    updatedPotentialRuns.push({ start, end, holes, birdies })
  }

  return updatedPotentialRuns.reverse()
}

const isRunBetter = (potentialRun: PotentialRun, run: PotentialRun) => {
  const equalHoles = potentialRun.holes === run.holes
  const equalBirdies = potentialRun.birdies === run.birdies
  const equalMisses =
    potentialRun.holes - potentialRun.birdies === run.holes - run.birdies

  // potential run is NOT better if it is equivalent
  if (equalBirdies && equalHoles) return false

  if ([equalHoles, equalBirdies, equalMisses].some(Boolean)) {
    const potentialRunPercentage = potentialRun.birdies / potentialRun.holes
    const runPercentage = run.birdies / run.holes

    return potentialRunPercentage > runPercentage
  }

  return potentialRun.birdies > run.birdies
}

const maybeAddRun = (
  potentialRun: PotentialRun,
  [...output]: PotentialRun[],
) => {
  let notCompared = true

  // TODO: short circuit if overlapped?
  output.forEach((run, i) => {
    const runsOverlap = potentialRun.start <= run.end

    if (!runsOverlap) return

    notCompared = false

    if (isRunBetter(potentialRun, run)) {
      output[i] = potentialRun
    }
  })

  if (notCompared) {
    output.push(potentialRun)
  }

  return output
}

const getBirdieRuns = (round: Round): BirdieRun[] => {
  const scores = round.holes.map(({ toPar }, i) => ({
    birdie: toPar < 0,
    hole: i + 1,
  }))

  // remove misses from beginning and end
  const predicate = ({ birdie }: { birdie: boolean }) => !birdie
  const trimmedScores = dropWhile(dropRightWhile(scores, predicate), predicate)

  // reduce scores to streaks and misses
  interface RawStreak {
    hole: number
    count: number
  }

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

  const streaks = []

  for (let i = 0; i < rawStreaks.length; i += 2) {
    const { count, hole } = rawStreaks[i]

    streaks.push({
      misses: rawStreaks[i - 1]?.count || 0,
      birdies: count,
      start: hole,
    })
  }

  let outputs: PotentialRun[] = []
  let potentialRuns: PotentialRun[] = []

  streaks.forEach(({ birdies, misses, start }, i) => {
    // update potential runs and remove if necessary
    potentialRuns = updatePotentialRuns({ potentialRuns, birdies, misses })

    // add streak to potential runs
    potentialRuns.push({
      birdies,
      start,
      end: start + birdies - 1,
      holes: birdies,
    })

    // if any potential runs is a run, add to outputs
    for (const potentialRun of potentialRuns) {
      if (isBirdieRun(potentialRun)) {
        outputs = maybeAddRun(potentialRun, outputs)
      }
    }
  })

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
