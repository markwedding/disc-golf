import recoil from 'recoil'
import { fetchRounds } from '../data'
import type { PlayerStats, Courses } from '../types'
import { mean, min, sortBy } from 'lodash-es'
import { playerAtom, roundSortAtom, selectedCoursesAtom } from './atoms'
import getBirdieRuns from 'src/utils/getBirdieRuns'

const { selector } = recoil

const roundsQuery = selector({
  key: 'roundsQuery',
  get: async () => fetchRounds(),
})

const playersSelector = selector({
  key: 'players',
  get: ({ get }) => {
    const rounds = get(roundsQuery)

    return [...new Set(rounds.map(({ player }) => player))]
  },
})

const roundsSelector = selector({
  key: 'rounds',
  get: ({ get }) => {
    const allRounds = get(roundsQuery)
    const player = get(playerAtom)

    return allRounds.filter((round) => round.player === player)
  },
})

const filteredRoundsSelector = selector({
  key: 'filteredRounds',
  get: ({ get }) => {
    const rounds = get(roundsSelector)
    const selectedCourses = get(selectedCoursesAtom)

    if (!selectedCourses.length) return rounds

    // TODO: inefficient filtering
    return rounds.filter((round) =>
      selectedCourses.some(
        ([course, layout]) =>
          round.course === course && round.layout === layout,
      ),
    )
  },
})

const playerStatsSelector = selector<PlayerStats>({
  key: 'playerStats',
  get: ({ get }) => {
    const rounds = get(filteredRoundsSelector)
    const scores = rounds.map(({ toPar }) => toPar)

    return {
      rounds: rounds.length,
      average: mean(scores),
      best: min(scores) || 0,
    }
  },
})

const sortedRoundsSelector = selector({
  key: 'sortedRounds',
  get: ({ get }) => {
    const rounds = get(filteredRoundsSelector)
    const roundSort = get(roundSortAtom)
    // copying since .sort mutates the array 😑
    const roundsCopy = [...rounds]

    roundsCopy.sort((a, b) => {
      if (roundSort === 'asc') return a.toPar - b.toPar

      return b.toPar - a.toPar
    })

    // return top 10 rounds
    return roundsCopy.slice(0, 10)
  },
})

const coursesSelector = selector<Courses>({
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

const birdieRunsSelector = selector({
  key: 'birdieRuns',
  get: ({ get }) => {
    const rounds = get(filteredRoundsSelector)

    if (rounds.length) return getBirdieRuns(rounds[1])

    return []
  },
})

export {
  roundsQuery,
  roundsSelector,
  playersSelector,
  playerStatsSelector,
  sortedRoundsSelector,
  coursesSelector,
  birdieRunsSelector,
}
