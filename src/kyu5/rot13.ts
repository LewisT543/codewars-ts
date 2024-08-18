
// "EBG13 rknzcyr." -> "ROT13 example."
// "This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"

const shiftLetter = (letter: string): string => /[a-mA-M]/.test(letter)
  ? String.fromCharCode(letter.charCodeAt(0) + 13)
  : String.fromCharCode(letter.charCodeAt(0) - 13)

export const rot13 = (str: string): string => str
  .split('')
  .map((char) =>
    /[a-zA-Z]/.test(char) ? shiftLetter(char) : char
  ).join('')

export const doTest = (input: string, out: string): string => {
  const inputArr = input.split('')
  const outArr = out.split('')
  return inputArr.map((char: string, index: number) =>
    /[a-zA-Z]/.test(char)
      ? asciiValueDif(char, outArr[index])
      : char)
    .join('')
}

const asciiValueDif = (inputChar: string, outputChar: string): number => {
  return inputChar.charCodeAt(0) - outputChar.charCodeAt(0)
}

// rule: if first half of alphabet shift -13, else shift +13
console.log("EBG13 rknzcyr. ->", "ROT13 example.")
// console.log(doTest("EBG13 rknzcyr.", "ROT13 example."))