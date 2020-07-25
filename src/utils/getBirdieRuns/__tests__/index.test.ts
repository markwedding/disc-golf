import type { Round } from 'src/types'
import getBirdieRuns from '..'

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

it('works for [0, 0]', () => {
  const round = roundWithScores([0, 0])
  expect(getBirdieRuns(round)).toEqual([])
})

it('works for [0, -1, 0]', () => {
  const round = roundWithScores([0, -1, 0])
  expect(getBirdieRuns(round)).toEqual([])
})

it('works for [-1, -1]', () => {
  const round = roundWithScores([-1, -1])
  expect(getBirdieRuns(round)).toEqual([
    {
      round,
      birdies: 2,
      holes: 2,
      start: 1,
      end: 2,
      run: [true, true],
    },
  ])
})

it('works for [-1, 0, -1]', () => {
  const round = roundWithScores([-1, 0, -1])
  expect(getBirdieRuns(round)).toEqual([
    {
      round,
      birdies: 2,
      holes: 3,
      start: 1,
      end: 3,
      run: [true, false, true],
    },
  ])
})

it('works for [0, 0, -1, 0, -1, 0]', () => {
  const round = roundWithScores([0, 0, -1, 0, -1, 0])
  expect(getBirdieRuns(round)).toEqual([
    {
      round,
      birdies: 2,
      holes: 3,
      start: 3,
      end: 5,
      run: [true, false, true],
    },
  ])
})

it('works for [0, 0, -1, 0, -1, 0, 0, 0, -1, -1]', () => {
  const round = roundWithScores([-1, 0, -1, 0, 0, 0, -1, -1])
  expect(getBirdieRuns(round)).toEqual([
    {
      round,
      birdies: 2,
      holes: 3,
      start: 1,
      end: 3,
      run: [true, false, true],
    },
    {
      round,
      birdies: 2,
      holes: 2,
      start: 7,
      end: 8,
      run: [true, true],
    },
  ])
})

it('works for [-1, -1, 0, 0, 1, -1, -1, 0, 0, -1, 0, -1, -1, 1, 0, 1, 0, -1]', () => {
  // prettier-ignore
  const round = roundWithScores([-1, -1, 0, 0, 1, -1, -1, 0, 0, -1, 0, -1, -1, 1, 0, 1, 0, -1])
  expect(getBirdieRuns(round)).toEqual([
    {
      round,
      birdies: 2,
      holes: 2,
      start: 1,
      end: 2,
      run: [true, true],
    },
    {
      round,
      birdies: 2,
      holes: 2,
      start: 6,
      end: 7,
      run: [true, true],
    },
    {
      round,
      birdies: 3,
      holes: 4,
      start: 10,
      end: 13,
      run: [true, false, true, true],
    },
  ])
})

//[-1,-1,0,0,1,-1,-1,0,0,-1,0,-1,-1,1,0,1,0,-1]
