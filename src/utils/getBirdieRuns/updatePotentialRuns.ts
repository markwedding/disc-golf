import type { PotentialRun } from 'src/types'

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

export default updatePotentialRuns
