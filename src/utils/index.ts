import getBirdieRuns from './getBirdieRuns'

const formatToPar = (toPar: number): string => {
  if (toPar === 0) return 'E'
  if (toPar > 0) return `+${toPar}`
  return `${toPar}`
}

const formatAverageToPar = (average: number) => {
  const truncatedAverage = +average.toFixed(2)

  return formatToPar(truncatedAverage)
}

const formatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export { formatToPar, formatAverageToPar, formatDate, getBirdieRuns }
