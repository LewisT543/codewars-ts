
// starting with [1], recursively add in 2 numbers created using:
//  "For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too."
// [1] => [1, (2*1) + 1, (3*1) + 1] => [1, 3, 4]
// we then do the same until we have added index 'n', we then return that number

export const dblLinear = (n: number): number => {
  const recur = (array: number[], currentIndex: number): number => {
    if (currentIndex >= n) return [...new Set(array)][n]
    const y = 2 * array[currentIndex] + 1
    const z = 3 * array[currentIndex] + 1
    return recur([...new Set([...array, y, z].sort((a, b) => a > b ? 1 : -1))], currentIndex + 1)
  }
  return recur([1], 0)
}

