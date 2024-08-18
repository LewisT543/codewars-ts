
/*
n - Move data pointer north (up)
e - Move data pointer east (right)
s - Move data pointer south (down)
w - Move data pointer west (left)

* - Flip the bit at the current cell (same as in Smallfuck)

[ - Jump past matching ] if bit under current pointer is 0 (same as in Smallfuck)
] - Jump back to the matching [ (if bit under current pointer is nonzero) (same as in Smallfuck)
*/


// commands are case sensitive
// all cells initialised as 0
// pointer starts top-left
// parse the code for numElements = iterations (valid chars only) - executing valid commands and ignoring invalid commands
// return final state of dataGrid joined into a string with "\r"'s and "\n"'s

type Command = 'n' | 's' | 'e' | 'w' | '*';
type Position = { row: number, col: number };
type BoardValue = 0 | 1;

class ArrayPointer {
  private board: BoardValue[][];
  private position: Position;

  constructor(board: BoardValue[][], startPosition: Position) {
    this.board = board;
    this.position = startPosition;
  }

  move(direction: Command): void {
    const numRows = this.board.length;
    const numCols = this.board[0].length
    const { row, col } = this.position;
    switch (direction) {
      case 'n': this.position.row = (row - 1 + numRows) % numRows; break;
      case 's': this.position.row = (row + 1) % numRows; break;
      case 'e': this.position.col = (col + 1) % numCols; break;
      case 'w': this.position.col = (col - 1 + numCols) % numCols; break;
      case '*': this.flipCurrentBit()
    }
  }

  private flipCurrentBit() {
    const curVal = this.getCurrentValue();
    const { row, col } = this.position;
    this.board[row][col] = curVal === 1 ? 0 : 1
  }

  getCurrentValue(): number {
    return this.board[this.position.row][this.position.col];
  }

  joinBoard(): string {
    return this.board.map((x) => `${x.join('')}`).join('\r\n')
  }
}

const buildBoard = (width: number, height: number): BoardValue[][] => {
  return [...Array(height)].map(_ => [...Array(width)].fill(0))
}

const findMatchingBracketIndex = (commands: string[], startIndex: number, direction: "left" | "right"): number => {
  let bracketCount = 1;
  const increment = direction === "right" ? 1 : -1;
  for (let i = startIndex + increment; i >= 0 && i < commands.length; i += increment) {
    if (commands[i] === "[") bracketCount += (direction === "right" ? 1 : -1);
    if (commands[i] === "]") bracketCount += (direction === "right" ? -1 : 1);
    if (bracketCount === 0) return i;
  }
  throw new Error(`No matching bracket found in ${direction} direction`);
}

type ValidCommand = Command | "[" | "]"

export const interpreter = (code: string, iterations: number, width: number, height: number): string => {
  const arrayPointer = new ArrayPointer(buildBoard(width, height), { col: 0, row: 0 })
  const filteredCommands = code.split('').filter((char): char is ValidCommand => ['n', 's', 'e', 'w', '*', '[', ']'].includes(char))
  for (let i = 0; iterations > 0; i++) {
    const currentCommand = filteredCommands[i];
    if(!currentCommand) return arrayPointer.joinBoard();
    if (currentCommand === "[" && arrayPointer.getCurrentValue() === 0) {
      i = findMatchingBracketIndex(filteredCommands, i, 'right')
    }
    if (currentCommand === "]" && arrayPointer.getCurrentValue() === 1) {
      i = findMatchingBracketIndex(filteredCommands, i, 'left')
    }
    if (['n', 's', 'e', 'w', '*'].includes(currentCommand)) {
      arrayPointer.move(currentCommand as Command)
    }
    iterations--
  }
  return arrayPointer.joinBoard()
}

