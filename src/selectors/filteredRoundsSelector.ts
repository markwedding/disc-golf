import recoil from 'recoil'
import { selectedCoursesAtom } from 'src/atoms'
import roundsSelector from './roundsSelector'

const { selector } = recoil

export default selector({
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
