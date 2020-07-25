import type { Run } from 'src/types'
import isRunBetter from './isRunBetter'

const maybeAddRun = (newRun: Run, [...output]: Run[]) => {
  let notCompared = true

  // TODO: short circuit if overlapped?
  output.forEach((run, i) => {
    const runsOverlap = newRun.start <= run.end

    if (!runsOverlap) return

    notCompared = false

    if (isRunBetter(newRun, run)) {
      output[i] = newRun
    }
  })

  if (notCompared) {
    output.push(newRun)
  }

  return output
}

export default maybeAddRun
