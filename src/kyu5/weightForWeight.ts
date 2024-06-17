
export const weightForWeight = (strng: string) => {
  const valsAndWeights = strng.split(' ').map(digits => ({ val: digits, weight: digits.split('').reduce((acc, cur) => parseInt(cur) + acc, 0) }))
  const sortedByWeightsAndAlpha = valsAndWeights.sort((a, b) => a.weight === b.weight ? a.val.localeCompare(b.val) : a.weight - b.weight)
  return sortedByWeightsAndAlpha.map(pair => pair.val).join(" ")
}