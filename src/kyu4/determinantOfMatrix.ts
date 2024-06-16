
export const determinantOfMatrix = (nums: number[][]) => {
  const getMinorMatrix = (matrix: number[][], exInd: number): number[][] => {
    // from N * N matrix, return N-1 * N-1 matrix
    const getArrayExcluding = <T>(arr: T[], exInd: number): T[] => [...arr.slice(0, exInd), ...arr.slice(exInd + 1)]
    return matrix.map(arr => getArrayExcluding(arr, exInd)).slice(1)
  }

  const det = (nums: number[][]): number => {
    if (nums[0].length === 1) return nums[0][0]
    if (nums[0].length === 2) {
      const flatNums = nums.flat()
      return flatNums[0] * flatNums[3] - flatNums[1] * flatNums[2]
    }
    return nums.reduce((acc, cur, ind) =>
      ind % 2 === 0
        ? acc + nums[0][ind] * det(getMinorMatrix(nums, ind))
        : acc - nums[0][ind] * det(getMinorMatrix(nums, ind))
    , 0)
  }
  return det(nums)
}