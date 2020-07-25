import type { PotentialRun } from 'src/types'
import config from './birdieRun.config'

type UpdatePotentialRuns = (params: {
  potentialRuns: PotentialRun[]
  birdies: number
  misses: number
}) => PotentialRun[]

/**
 * Updates potential runs:
 * - adds misses
 * - determines if run has ended
 * - updates holes, birdies, and end
 */
const updatePotentialRuns: UpdatePotentialRuns = ({
  potentialRuns,
  misses,
  birdies: newBirdies,
}) => {
  let i = potentialRuns.length
  const updatedPotentialRuns = []

  /**
   * Iterate in reverse order. The loop can be short-circuited if one of the
   * potential runs is over since any preceding potential runs would be over as
   * well
   */
  while (i--) {
    const potentialRun = potentialRuns[i]

    let { holes, birdies, end, start } = potentialRun

    // add misses
    holes += misses

    // determine if run is over
    if (holes - birdies > config.runDefinition.maxMisses) {
      return updatedPotentialRuns.reverse()
    }

    // update properties
    holes += newBirdies
    birdies += newBirdies
    end += misses + newBirdies

    updatedPotentialRuns.push({ start, end, holes, birdies })
  }

  return updatedPotentialRuns.reverse()
}

export default updatePotentialRuns
