import recoil from 'recoil'

const { atom } = recoil

const playerAtom = atom<string | undefined>({
  key: 'player',
  default: undefined,
})

const roundSortAtom = atom<'asc' | 'desc'>({
  key: 'roundSort',
  default: 'asc',
})

export { playerAtom, roundSortAtom }
