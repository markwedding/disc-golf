const isBirdieRun = (scores: boolean[]) => {
  const misses = scores.filter((isBirdie) => !isBirdie).length
  const total = scores.length

  if (total <= 1) return false

  if (total === 2) return misses === 0

  if (total <= 4) return misses <= 1

  if (total <= 9) return misses <= 2

  return misses <= 3
}

export default isBirdieRun
