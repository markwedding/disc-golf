const config = {
  runDefinition: {
    thresholds: [
      // invalid: 1/1, 1/2
      // valid: 2/2
      { from: 2, to: 2, canMiss: 0 },
      // valid: 2/3, 3/3, 3/4, 4/4
      { from: 3, to: 4, canMiss: 1 },
      // valid: 3/5, 4/5, 5/5, 4/6 ... 7/9
      { from: 5, to: 9, canMiss: 2 },
    ],
    // invalid: 6/9
    // valid: 7/10, 8/10, 9/10, 10/10, 8/11, ...
    maxMisses: 3,
  },
}

export default config
