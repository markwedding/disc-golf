import recoil from 'recoil'

const { atom } = recoil

const playerAtom = atom<string | undefined>({
  key: 'player',
  default: undefined,
})

const selectedCoursesAtom = atom<[string, string][]>({
  key: 'selectedCourses',
  default: [],
})

const roundSortAtom = atom<'asc' | 'desc'>({
  key: 'roundSort',
  default: 'asc',
})

export { playerAtom, roundSortAtom, selectedCoursesAtom }
