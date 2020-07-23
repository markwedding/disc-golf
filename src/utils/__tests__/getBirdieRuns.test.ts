import getBirdieRuns from '../getBirdieRuns'
import type { Round } from 'src/types'

const mockRound = {
  par: 63,
  score: 50,
  course: 'Bailey Road Park',
  layout: 'Max Holes - 2016',
  player: 'Mark',
  id: '1be633e4-d6ea-4b2f-bff1-7d1af705ab94',
  toPar: -13,
  date: new Date(),
  holes: [
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 3, toPar: 0 },
    { par: 3, score: 2, toPar: -1 },
    { par: 3, score: 3, toPar: 0 },
  ],
}

const roundWithScores = (toPars: number[]): Round => ({
  ...mockRound,
  holes: toPars.map((toPar) => ({
    toPar,
    par: 3,
    score: 3 + toPar,
  })),
})

it('should not return birdie runs for round with none', () => {
  const round = roundWithScores([0, 0])
  expect(getBirdieRuns(round)).toEqual([])
})
// it('should recognize 2/2 birdie run', () => {
//   const round = roundWithScores([-1, -1])
//   expect(getBirdieRuns(round)).toEqual([
//     {
//       round,
//       start: 1,
//       end: 2,
//       run: [true, true],
//     },
//   ])
// })

// it('should recognize 2/3 birdie run', () => {
//   const round = roundWithScores([-1, 0, -1])
//   expect(getBirdieRuns(round)).toEqual([
//     {
//       round,
//       start: 1,
//       end: 3,
//       run: [true, false, true],
//     },
//   ])
// })

// it('should pick 2/2 run over 2/3 run', () => {
//   const round = roundWithScores([-1, -1, 0])
//   expect(getBirdieRuns(round)).toEqual([
//     {
//       round,
//       start: 1,
//       end: 2,
//       run: [true, true],
//     },
//   ])
// })
