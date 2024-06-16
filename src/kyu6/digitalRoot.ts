
export const digitalRoot = (n: number): number => {
  const sumOfDigits = (n: number): number => n.toString().split('').map(x => parseInt(x)).reduce((acc, cur) => acc + cur)
  const recur = (n: number): number => n.toString().length === 1 ? n : recur(sumOfDigits(n))
  return recur(n)
}
