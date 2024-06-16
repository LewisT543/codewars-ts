
export const encryptThis = (str: string): string => {
  if (str.length === 0) return ""

  const encryptWord = (str: string): string => {
    const firstLetterCode = str.charCodeAt(0)
    if (str.length === 1) return String(firstLetterCode)
    if (str.length === 2) return `${firstLetterCode}${str[1]}`
    return `${firstLetterCode}${str.slice(-1)}${str.slice(2, -1)}${str[1]}`
  }
  return str.split(" ").map(encryptWord).join(" ")
}

