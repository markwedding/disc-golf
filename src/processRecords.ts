import type { Round, ParsedRecord } from './types'

const getHoles = (record: ParsedRecord) =>
  Object.entries(record)
    .reduce<number[]>((acc, [key, value]) => {
      if (key.includes('hole')) return [...acc, value as number]

      return acc
    }, [])
    .filter(Boolean)

export default function processRecords(records: ParsedRecord[]): Round[] {
  // combine par and actual records
  const parRecords = records.filter((_, i) => i % 2 === 0)
  const actualRecords = records.filter((_, i) => i % 2 === 1)

  return parRecords.map((parRecord, i) => {
    const actualRecord = actualRecords[i]
    const { courseName: course, total: par, layoutName: layout } = parRecord
    const { total: score, toPar, playerName: player, date } = actualRecord

    const pars = getHoles(parRecord)
    const actuals = getHoles(actualRecord)

    return {
      par,
      score,
      course,
      layout,
      player,
      toPar: toPar as number,
      date: new Date(date),
      holes: pars.map((par, i) => {
        const actual = actuals[i]

        return {
          par,
          score: actual,
          toPar: actual - par,
        }
      }),
    }
  })
}
