

type Result = [number, number, boolean]

export const productFib = (prod: number): Result => {
  const recur = (current: Result): Result => {
    if (current[0] * current[1] === prod) return [current[0], current[1], true]
    if (current[0] * current[1] > prod) return [current[0], current[1], false]
    return recur([current[1], current[0] + current[1], false])
  }
  return recur([1, 1, false])
}