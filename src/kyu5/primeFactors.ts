export const primeFactors = (n: number): string => {
  const divideAndBuild = (remaining: number, array: number[], divisor: number): number[] => {
    if (remaining === 1) return array
    if (remaining % divisor === 0) return divideAndBuild(remaining / divisor, [...array, divisor], divisor)
    return divideAndBuild(remaining, array, divisor + 1)
  }
  const makeString = (arr: number[]) => {
    const pairsAsStrings =  arr
      .map(val => [val, arr.filter(el => el === val).length])
      .map(([val, occur]) => occur === 1 ? `(${val})` : `(${val}**${occur})`)
    return Array.from(new Set(pairsAsStrings)).join('')
  }
  return makeString(divideAndBuild(n, [], 2))
}