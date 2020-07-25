import type { PotentialRun } from 'src/types'
import config from './birdieRun.config'

const {
  runDefinition: { thresholds, maxMisses },
} = config

const [lowestThreshold] = thresholds

const isRun = ({ birdies, holes }: PotentialRun) => {
  const misses = holes - birdies

  if (holes < lowestThreshold.from) return false

  for (const { to, canMiss } of thresholds) {
    if (holes <= to) return misses <= canMiss
  }

  return misses <= maxMisses
}

export default isRun
