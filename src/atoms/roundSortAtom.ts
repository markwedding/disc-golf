import recoil from 'recoil'

const { atom } = recoil

export default atom<'asc' | 'desc'>({
  key: 'roundSort',
  default: 'asc',
})
