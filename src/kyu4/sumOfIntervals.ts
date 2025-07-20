

// return the sum of all the interval lengths. Overlapping intervals should only be counted once.
// overlapping intervals can be counted as one [1, 4] + [3, 5] => [1, 5]

export const sumOfIntervals = (intervals: [number, number][]): number => {
  const sortedIntervals = intervals.sort((first, second) => first[0] - second[0])
  let currentInterval = sortedIntervals[0];
  let sum = 0
  for (let i = 1; i < sortedIntervals.length; i++) {
    if (sortedIntervals[i][0] <= currentInterval[1]) { // if this.min <= prev.max
      currentInterval[1] = Math.max(currentInterval[1], sortedIntervals[i][1]) // prev.max => MAX(prev.max or this.max)
    } else {
      sum += currentInterval[1] - currentInterval[0] // sum += max - min
      currentInterval = sortedIntervals[i] // set this one to prev now
    }
  }
  return sum + currentInterval[1] - currentInterval[0]
}