

/*
if X[i] > X[j] then X[i] = X[i] - X[j]

X_1 = [6, 9, 12] # -> X_1[2] = X[2] - X[1] = 21 - 9
X_2 = [6, 9, 6]  # -> X_2[2] = X_1[2] - X_1[0] = 12 - 6
X_3 = [6, 3, 6]  # -> X_3[1] = X_2[1] - X_2[0] = 9 - 6
X_4 = [6, 3, 3]  # -> X_4[2] = X_3[2] - X_3[1] = 6 - 3
X_5 = [3, 3, 3]  # -> X_5[1] = X_4[0] - X_4[1] = 6 - 3
*/

// reduce the numbers arr by taking the biggest number, and taking the second biggest number away from it
// replace the original biggest number with the result of the subtraction
// do this until it is no longer possible to do a subtraction of two numbers and get a positive integer as the result

// Function to compute GCD using Euclidean algorithm
const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Function to compute GCD of an array of numbers
const gcdArray = (numbers: number[]): number => {
  return numbers.reduce((acc, num) => gcd(acc, num), numbers[0]);
}

type FindLargestReturnType = { largest: number, secondLargest: number, largestIndex: number }
const findLargest = (numbers: number[]): FindLargestReturnType => {
  return numbers.reduce((acc, cur, ind) => {
    console.log(`index: ${ind} => acc: `)
    console.log(acc)
    if (cur > acc.largest) return { largest: cur, secondLargest: acc.largest, largestIndex: ind }
    if (cur > acc.secondLargest && cur !== acc.largest) return { largest: acc.largest, secondLargest: cur, largestIndex: acc.largestIndex }
    return acc
  }, { largest: -1, secondLargest: -1, largestIndex: -1 })
}
export function solution(numbers: number[]): number {
  console.log(numbers)
  console.log('gcdArray: ')
  console.log(gcdArray(numbers))
  if (numbers.indexOf(1) > -1) return numbers.length;
  if (new Set(numbers).size === 1) return numbers[0] * numbers.length;
  const recur = (numbers: number[]) => {
    const { largest, secondLargest, largestIndex } = findLargest(numbers)
    console.log(`sum result: ${largest - secondLargest} \n`)
    return [...numbers.slice(0, largestIndex), largest - secondLargest, ...numbers.slice(largestIndex + 1)]
  }
  return solution(recur(numbers))
}

export const solution2 = (numbers: number[]): number => {
  if (numbers.indexOf(1) > -1) return numbers.length;
  if (new Set(numbers).size === 1) return numbers[0] * numbers.length;
  const sorted = [...numbers].sort().reverse()
  let newNumbers = numbers
  sorted.forEach((num: number, index: number) => {
    if (numbers[index] % num === 0) {
      newNumbers[index] = num
    }
  })
  console.log(newNumbers)
  return 0
}


const testArr = [6, 9, 12]

