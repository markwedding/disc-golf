import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { camelCase } from 'lodash-es'
import type { Record } from './types'
import processRecords from './processRecords'

const App = () => {
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
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
        const rounds = processRecords(records)
        console.log(rounds)

        setPlayers([...new Set(rounds.map(({ player }) => player))])
      },
    })
  }, [])

  return players.map((player) => <p>{player}</p>)
}

export default App
