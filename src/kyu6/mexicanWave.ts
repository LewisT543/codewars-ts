
export const mexicanWave = (str: string): string[] => {
  return Array.from<string>({ length: str.length }).fill(str.toLowerCase()).map((val, index) =>
    val.split('').map((letter, letterInd) =>
      index === letterInd ? letter.toUpperCase() : letter).join('')
  ).filter(newVal => /[A-Z]/.test(newVal))
}