
export const countSmileys = (arr: string[]): number => arr.filter(smiley =>
  [':)', ':D', ';)', ';D', ':-)', ':~)', ':-D', ':~D', ';-)', ';~)', ';-D', ';~D'].includes(smiley)
).length

export const countSmileys2 = (arr: string[]): number => {
  return arr.filter(face => {
    if (face.startsWith(':') || face.startsWith(';')) {
      if (face.endsWith('D') || face.endsWith(')')) {
        if (face.length === 2) return true
        else return face.length === 3 && (face[1] === '-' || face[1] === '~')
      }
    }
  }).length
}