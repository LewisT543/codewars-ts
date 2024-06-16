
export const towerOfCubes = (m: number): number => {
  const deductFromTotal = (remainingM: number, iter: number): number => remainingM - (iter * iter * iter)
  const recur = (m: number, currentIter: number): number => {
    const newTotal = deductFromTotal(m, currentIter)
    if (newTotal <= -1) return -1
    return newTotal === 0 ? currentIter : recur(newTotal, currentIter + 1)
  }
  return recur(m, 1)
}