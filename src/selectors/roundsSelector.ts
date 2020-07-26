import recoil from 'recoil'
import { playerAtom } from 'src/atoms'
import { roundsQuery } from '.'

const { selector } = recoil

export default selector({
  key: 'rounds',
  get: ({ get }) => {
    const allRounds = get(roundsQuery)
    const player = get(playerAtom)

    return allRounds.filter((round) => round.player === player)
  },
})
