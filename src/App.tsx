import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { camelCase } from 'lodash-es'

const App = () => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    Papa.parse('./scorecards.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        if (header === '+/-') return 'toPar'

        return camelCase(header)
      },
      complete: (results) => {
        console.log(results)
        setData(results)
      },
    })
  }, [])

  return <p>App</p>
}

export default App
