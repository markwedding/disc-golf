import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    Papa.parse('./scorecards.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results)
      },
    })
  }, [])

  return <p>App</p>
}

export default App
