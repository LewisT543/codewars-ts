

export const stockList = (listOfArt:string[], listOfCat:string[]):string => {
  if (listOfCat.length === 0 || listOfArt.length === 0) return '';

  const startingObject = listOfCat.reduce<{[key: string]: number}>((acc, key) => ({ ...acc, [key]: 0 }), {})

  const stocks = listOfArt.reduce((acc, cur) => {
    const currentCat = cur.charAt(0)
    return acc[currentCat] === undefined ? acc : { ...acc, [currentCat]: acc[currentCat] + Number(cur.split(' ')[1]) }
  }, startingObject)

  return listOfCat.map(cat => `(${cat} : ${stocks[cat]})`).join(' - ')
}