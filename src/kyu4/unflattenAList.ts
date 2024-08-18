
/*
- You have to do several runs. The depth is the number of runs, you have to do.
- In every run you have to switch the direction. First run from left, next run from right. Next left...
Every run has these rules:
- You start at the first number (from the direction).
- Take for every number x the remainder of the division by the number of still available elements (from
  this position!) to have the number for the next decision.
- If the remainder-value is smaller than 3, take this number x (NOT the remainder-Value) direct
  for the new array and continue with the next number.
- If the remainder-value (e.g. 3) is greater than 2, take the next remainder-value-number (e.g. 3)
  elements/numbers (inclusive the number x, NOT the remainder-value) as a sub-array in the new array.
  Continue with the next number/element AFTER this taken elements/numbers.
- Every sub-array in the array is independent and is only one element for the progress on the array.
  For every sub-array you have to follow the same rules for unflatten it.
  The direction is always the same as the actual run.

    var input = [ 4, 5, 1, 7, 1 ];
    var expected = [ [ 4, [ 5, 1, 7 ] ], 1 ];

    L -> R (input = [ 4, 5, 1, 7, 1 ])
    pass 1: step 1: x = 4 -> 4 % 5 = 4, (4 > 2) => [ [ 4, 5, 1, 7 ] ]
    pass 1: step 2: x = 1 -> 1 % 1 = 0, (0 < 2) => [ [ 4, 5, 1, 7 ], 1 ]

    R -> L (input = [ [ 4, 5, 1, 7 ], 1 ])
    pass 2: step 1: x = 1 -> 1 % 1 = 9, (0 < 3) => [ 1 ]
    pass 2: step 2: x = [ 4, 5, 1, 7 ] =>
        pass 2: step 2a: x = 7 -> 7 % 4 = 3, (3 > 2) => [ [ [ 5, 1, 7 ]], 1 ]
        pass 2: step 2b: x = 4 -> 4 % 1 = 0, (0 < 2) => [ [ 4, [ 5, 1, 7 ] ], 1 ]


  depth = numRuns
  each run:
     -> swap direction of pass
     -> start at first number based on direction
     each number:
        -> remainder = x % (ele to [direction]).length
        -> if (remainder < 3) return x
        if (remainder > 2) take [remainder] number of elements to the [direction] as a sub-array of the new array [include X]
*/

type RightOrLeft = 'right' | 'left'
export const unflatten = (flatArray: number[], depth: number): any[] => {
  const spliceInDirection = (array: any[], index: number, remainder: number, isRightToLeft: RightOrLeft) => {
    return isRightToLeft === 'right'
      ? array.splice(index, 0, array.splice(index, remainder))
      : array.splice(index - remainder + 1, 0, array.splice(index - remainder + 1, remainder))
  }

  const doRightPass = (inputArr: any[]) => {
    let length = inputArr.length
    let currentIndex = 0
    while (currentIndex < length) {
      let currentElement = inputArr[currentIndex]
      if (typeof currentElement == 'number') {
        const remainingElements = length - currentIndex
        const remainder = currentElement % remainingElements
        if (remainder > 2) {
          spliceInDirection(inputArr, currentIndex, remainder, 'right')
        }
      } else {
        doRightPass(currentElement)
      }

      currentIndex++;
      length = inputArr.length
    }
  }
  const doLeftPass = (inputArr: any[]): void => {
    let length = inputArr.length;
    let currentIndex = length - 1;
    while (currentIndex >= 0) {
      let currentElement = inputArr[currentIndex];
      if (typeof currentElement == 'number') {
        const remainingElementsCount = currentIndex + 1;
        const remainder = currentElement % remainingElementsCount;
        if (remainder > 2) {
          spliceInDirection(inputArr, currentIndex, remainder, 'left')
          currentIndex -= remainder - 1;
        }
      } else {
        doLeftPass(currentElement);
      }
      currentIndex--;
    }
  }

  let finalArr: any[] = flatArray;
  for (let i = 0; i < depth; i++) {
    (i % 2 === 0)
      ? doRightPass(finalArr)
      : doLeftPass(finalArr)
  }

  return finalArr
}