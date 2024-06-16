
export const meetings = (s: string): string => {
  const makePair = (guest: string): string => {
    const [ firstName, lastName ] = guest.split(':')
    return `(${lastName.toUpperCase()}, ${firstName.toUpperCase()})`
  }

  return s.split(";").map(makePair).sort().join('')
}

// parse into pairs, sort by lastname then firstname

//  IN  "Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill";
// OUT  "(CORWILL, ALFRED)(CORWILL, FRED)(CORWILL, RAPHAEL)(CORWILL, WILFRED)(TORNBULL, BARNEY)(TORNBULL, BETTY)(TORNBULL, BJON)"

export const meetings2 = (s: string): string => s.split(";")
  .map(guest =>
    guest.split(":").reduce((acc, cur) =>
      `(${cur.toUpperCase()}, ${acc.toUpperCase()})`)
  ).sort()
  .join('')
