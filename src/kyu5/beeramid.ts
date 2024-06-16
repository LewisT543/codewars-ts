
export const beeramid = (bonus: number, price: number): number => {
  const recur = (remainingBeers: number, layerIter: number): number => {
    const newTotal = remainingBeers - (layerIter * layerIter)
    if (newTotal === 0) return layerIter
    return newTotal < 0 ? layerIter - 1 : recur(newTotal, layerIter + 1)
  }
  return recur(bonus/price, 1)
}
