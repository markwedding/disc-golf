import { sortBy } from 'lodash-es'
import recoil from 'recoil'
import type { Courses } from 'src/types'
import roundsSelector from './roundsSelector'

const { selector } = recoil

export default selector<Courses>({
  key: 'courses',
  get: ({ get }) => {
    const rounds = get(roundsSelector)

    const courses = rounds.reduce<{ [key: string]: Set<string> }>(
      (obj, { course, layout }) => {
        if (!(course in obj)) {
          obj[course] = new Set()
        }

        obj[course].add(layout)

        return obj
      },
      {},
    )

    // sort entries by course
    const entries = sortBy(Object.entries(courses), ([course]) => course)

    // convert Sets into sorted arrays
    return entries.reduce(
      (obj, [course, layouts]) => ({ ...obj, [course]: [...layouts].sort() }),
      {},
    )
  },
})
