import type { PotentialRun } from 'src/types'
import config from './birdieRun.config'

const {
  runDefinition: { thresholds, maxMisses },
} = config

const [lowestThreshold] = thresholds

/**
 * Determines if potential run is an actual run according to runDefinition
 * specified in the _birdieRun.config.js_ file.
 */
const isRun = ({ birdies, holes }: PotentialRun) => {
  const misses = holes - birdies

  if (holes < lowestThreshold.from) return false

  for (const { to, canMiss } of thresholds) {
    if (holes <= to) return misses <= canMiss
  }

  return misses <= maxMisses
}

export default isRun
