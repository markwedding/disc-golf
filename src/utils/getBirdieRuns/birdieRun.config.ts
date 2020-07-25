const config = {
  runDefinition: {
    thresholds: [
      { from: 2, to: 2, canMiss: 0 },
      { from: 3, to: 4, canMiss: 1 },
      { from: 5, to: 9, canMiss: 2 },
    ],
    maxMisses: 3,
  },
}

export default config
