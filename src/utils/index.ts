const formatToPar = (toPar: number): string => {
  if (toPar === 0) return 'E'
  if (toPar > 0) return `+${toPar}`
  return `${toPar}`
}

const formatAverageToPar = (average: number) => {
  const truncatedAverage = +average.toFixed(2)

  return formatToPar(truncatedAverage)
}

export { formatToPar, formatAverageToPar }
