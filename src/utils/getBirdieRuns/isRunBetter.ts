import type { Run } from 'src/types'

const isRunBetter = (newRun: Run, oldRun: Run) => {
  const equalHoles = newRun.holes === oldRun.holes
  const equalBirdies = newRun.birdies === oldRun.birdies
  const equalMisses =
    newRun.holes - newRun.birdies === oldRun.holes - oldRun.birdies

  // new run is NOT better if it is equivalent
  if (equalBirdies && equalHoles) return false

  if ([equalHoles, equalBirdies, equalMisses].some(Boolean)) {
    const newRunPercentage = newRun.birdies / newRun.holes
    const oldRunPercentage = oldRun.birdies / oldRun.holes

    return newRunPercentage > oldRunPercentage
  }

  return newRun.birdies > oldRun.birdies
}

export default isRunBetter
