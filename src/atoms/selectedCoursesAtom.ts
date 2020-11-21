import recoil from 'recoil'

const { atom } = recoil

export default atom<[string, string][]>({
  key: 'selectedCourses',
  default: [],
})
