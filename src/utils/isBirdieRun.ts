import type { PotentialRun } from 'src/types'

const isBirdieRun = ({ birdies, holes }: PotentialRun) => {
  const misses = holes - birdies

  if (holes <= 1) return false

  if (holes === 2) return misses === 0

  if (holes <= 4) return misses <= 1

  if (holes <= 9) return misses <= 2

  return misses <= 3
}

export default isBirdieRun
