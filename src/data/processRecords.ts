import { v4 as uuidv4 } from 'uuid'
import type { Round, Record } from '../types'

const getHoleValues = (record: Record) =>
  Object.entries(record)
    .reduce<number[]>((acc, [key, value]) => {
      if (key.includes('hole')) return [...acc, value as number]

      return acc
    }, [])
    .filter(Boolean)

export default function processRecords(records: Record[]): Round[] {
  const parRecords = records.filter((_, i) => i % 2 === 0)
  const scoreRecords = records.filter((_, i) => i % 2 === 1)

  return parRecords.map((parRecord, i) => {
    const scoreRecord = scoreRecords[i]
    const { courseName: course, total: par, layoutName: layout } = parRecord
    const { total: score, toPar, playerName: player, date } = scoreRecord

    const pars = getHoleValues(parRecord)
    const scores = getHoleValues(scoreRecord)

    return {
      par,
      score,
      course,
      layout,
      player,
      id: uuidv4(),
      toPar: toPar as number,
      date: new Date(date),
      holes: pars.map((par, i) => {
        const score = scores[i]

        return {
          par,
          score,
          toPar: score - par,
        }
      }),
    }
  })
}
