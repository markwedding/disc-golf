import recoil from 'recoil'

const { atom } = recoil

const playerAtom = atom<string | undefined>({
  key: 'player',
  default: undefined,
})

export { playerAtom }
