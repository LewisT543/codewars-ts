
/*
'+' = add
'-' = subtract
'*' = multiply
'$' = divide

break the string down and calculate the expression using this order of operations.
  (division => multiplication => subtraction => addition)

If you are given an invalid input (i.e. any character except .0123456789+-*$) you should return the error message:'400: Bad request'

**convert the number to floats, not to integers**
*/

// consts for
// number of ops is unlimited so while loop or recursion,

type OperMemo = {
  divisions: number,
  multiplications: number,
  subtractions: number,
  additions: number
}

export const calculate = (sum: string): string | number => {
  if (!/^[.\d+\-*$]+$/.test(sum)) return '400: Bad request'

  const walkAndBuildStr = (str: string, direction: 'right'|'left', index: number, currentNumber: string = ''): string => {
    const currentValue = str[index]
    const isRight = direction === 'right'
    if (["$", "*", "-", "+"].includes(currentValue)) return currentNumber;

    const newNumber = isRight ? currentNumber + currentValue : currentValue + currentNumber
    if (index <= 0 || index >= str.length - 1) return newNumber

    const newIndex = isRight ? index + 1 : index - 1;
    return walkAndBuildStr(str, direction, newIndex, newNumber)
  }

  const countChar = (str: string, char: string): number => str.split(char).length - 1

  let hasOper: OperMemo = {
    divisions: countChar(sum, "$"),
    multiplications: countChar(sum, "*"),
    subtractions: countChar(sum, "-"),
    additions: countChar(sum, "+")
  }

  console.log(hasOper)

  const buildSingleSumStr = (sum: string, index: number) =>
    walkAndBuildStr(sum, "left", index - 1)
    + sum[index]
    + walkAndBuildStr(sum, "right",  index + 1)

  const reduceMemo = (sum: string, memo: OperMemo): string | number => {
    // find first avl division symbol index -> get numbers each side -> do sum -> swap whole sum for new result -> repeat
    // if (!memo.divisions && !memo.multiplications && !memo.subtractions && !memo.additions) return sum
    if (!memo.divisions ) return sum
    if(memo.divisions > 0 ) {
      const indexOfOper = sum.indexOf("$")
      const singleSum = buildSingleSumStr(sum, indexOfOper)
      // do sum
      let sumResult = "5"
      console.log(`${singleSum}=${sumResult}`)
      const newFullSum = sum.replace(singleSum, sumResult)
      return reduceMemo(newFullSum, {...memo, divisions: memo.divisions - 1})
    }
    return reduceMemo(sum, memo)
  }

  return reduceMemo(sum, hasOper);
}