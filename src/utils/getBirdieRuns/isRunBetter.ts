import type { Run } from 'src/types'

/**
 * Determines if the newRun is better than the old run.
 */
const isRunBetter = (newRun: Run, oldRun: Run) => {
  const equalHoles = newRun.holes === oldRun.holes
  const equalBirdies = newRun.birdies === oldRun.birdies
  const equalMisses =
    newRun.holes - newRun.birdies === oldRun.holes - oldRun.birdies

  // new run is not better if it is equivalent
  if (equalBirdies && equalHoles) return false

  /**
   * With the following scenarios, the highest birdie % wins:
   * - equalHoles: 5/7 < 6/7
   * - equalBirdies: 5/7 < 5/5
   * - equalMisses: 5/7 < 6/8
   */
  if ([equalHoles, equalBirdies, equalMisses].some(Boolean)) {
    const newRunPercentage = newRun.birdies / newRun.holes
    const oldRunPercentage = oldRun.birdies / oldRun.holes

    return newRunPercentage > oldRunPercentage
  }

  /**
   * Otherwise, the most birdies wins:
   * 5/7 < 7/10
   * 3/3 < 4/5
   */
  return newRun.birdies > oldRun.birdies
}

export default isRunBetter
