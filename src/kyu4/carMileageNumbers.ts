
type NoCloseYes = 0 | 1 | 2;
type Predicate = (num: number) => NoCloseYes

const isOneOrTwoOff = (num: number, condition: (arg: number) => boolean): NoCloseYes => {
  return condition(num + 1) || condition(num + 2) ? 1 : 0;
}

const predicates: [string, Predicate][] = [
  ["anyDigitWithTrailingZeros", (num: number) => {
    const hasTrailingZeros = (n: number): boolean => {
      return /^[1-9]0+$/.test(n.toString()) && n.toString().length > 2
    }
    return hasTrailingZeros(num) ? 2 : isOneOrTwoOff(num, hasTrailingZeros);
  }],
  ["allDigitsTheSame", (num: number) => {
    const allDigitsSame = (num: number): boolean => new Set(num.toString().split('')).size === 1 && num.toString().length > 2
    return allDigitsSame(num) ? 2 : isOneOrTwoOff(num, allDigitsSame);
  }],
  ["allDigitsAscending", (num: number) => {
    const allDigitsAscending = (num: number): boolean => {
      return num.toString().split('').map(Number).map((digit, ind, arr) => {
        if (ind === 0) return true;
        if (arr[ind - 1] === digit - 1 && arr[ind - 1] !== 0) return true;
        return digit === 0 && arr[ind - 1] === 9;
      }).reduce((acc, cur, _, arr) => acc && cur && arr.length > 2)
    }
    return allDigitsAscending(num) ? 2 : isOneOrTwoOff(num, allDigitsAscending);
  }],
  ["allDigitsDescending", (num: number) => {
  const allDigitsDescending = (num: number): boolean => {
    return num.toString().split('').map(Number).map((digit, ind, arr) => {
      if (ind === 0) return true;
      if (arr[ind - 1] === digit + 1 && arr[ind - 1] !== 0) return true
      return digit === 0 && arr[ind - 1] === 1;
    }).reduce((acc, cur, _, arr) => acc && cur && arr.length > 2)
  }
  return allDigitsDescending(num) ? 2 : isOneOrTwoOff(num, allDigitsDescending);
  }],
  ["isPallindrome", (num: number) => {
    const isPallindrome = (num: number): boolean => {
      const digits = num.toString().split('')
      const isEvenNumElements = digits.length % 2 === 0
      const middleIndex = isEvenNumElements ? digits.length / 2 : Math.floor(digits.length / 2)
      const firstHalf = digits.slice(0, isEvenNumElements ? middleIndex : middleIndex + 1)
      const secondHalf = digits.slice(middleIndex)
      return firstHalf.join('') === secondHalf.slice().reverse().join('') && digits.length > 2;
    }
    return isPallindrome(num) ? 2 : isOneOrTwoOff(num, isPallindrome)
  }]
];

export const isInteresting = (n: number, awesomePhrases: number[]): number => {
  if (n < 98 || n >= 1_000_000_000) return 0;
  if (awesomePhrases.includes(n)) return 2;
  if (awesomePhrases.includes(n + 1) || awesomePhrases.includes(n + 2)) return 1;

  let result = 0;
  for (const [key, predicate] of predicates) {
    if (predicate(n) === 2) return 2;
    result = predicate(n) === 1 || result === 1 ? 1 : 0
  }
  return result
}