import recoil from 'recoil'
import { roundSortAtom } from 'src/atoms'
import { filteredRoundsSelector } from '.'

const { selector } = recoil

export default selector({
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
