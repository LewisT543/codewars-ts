
// Before and after each odd digit, remove doubles, none at the ends
export const dashatizeIt = (num: number): string => {
  const withDashesNoDupes = num.toString().split('').map(digit =>
    !isNaN(parseInt(digit)) && parseInt(digit) % 2 !== 0 ? `-${digit}-` : digit
  ).join('').replaceAll('--', '-')

  const replaceFirstAndLast = (cleanedStr: string): string => {
    const isFirst = cleanedStr[0] === '-'
    const isLast = cleanedStr.slice(-1) === '-'
    if (!isFirst && !isLast) return cleanedStr
    if (isFirst) return replaceFirstAndLast(cleanedStr.slice(1))
    if (isLast) return replaceFirstAndLast(cleanedStr.slice(0, -1))
    return replaceFirstAndLast(cleanedStr)
  }
  return replaceFirstAndLast(withDashesNoDupes)
}