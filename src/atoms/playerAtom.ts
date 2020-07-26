import recoil from 'recoil'

const { atom } = recoil

export default atom<string | undefined>({
  key: 'player',
  default: undefined,
})
