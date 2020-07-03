import Papa from 'papaparse'
import { camelCase } from 'lodash-es'
import processRecords from './processRecords'
import type { Record, Round } from '../types'

const fetchRounds = () =>
  new Promise<Round[]>((resolve) => {
    Papa.parse<Record>('./scorecards.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        if (header === '+/-') return 'toPar'

        return camelCase(header)
      },
      complete: ({ data: records }) => {
        // TODO: remove
        console.log(processRecords(records))

        resolve(processRecords(records))
      },
    })
  })

export default fetchRounds
