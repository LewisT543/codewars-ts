
type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6
type Row = 0 | 1 | 2 | 3 | 4 | 5
type Player = 1 | 2
type BoardCell = {
  position: [Column, Row];
  piece?: Player;
  toString(): string;
}

const createBoardCell = (position: [Column, Row], piece?: Player): BoardCell => ({
  position,
  piece,
  toString() {
    const pieceRepresentation = this.piece ? this.piece : 'undefined';
    return `Cell(${this.position[0]}, ${this.position[1]}): ${pieceRepresentation}`;
  }
});

export class Connect4 {
  columns: number;
  rows: number;
  board: BoardCell[][];
  currentPlayer: Player;
  gameWon?: Player;

  constructor() {
    this.columns = 7
    this.rows = 6
    this.board = this.buildBoard();
    this.currentPlayer = 1 ;
  }

  play(col: number): string{
    if (this.gameWon) return "Game has finished!"
    if (col > this.columns) return "Invalid Move"

    const firstEmptyCell = this.board.map((row) => row[col]).find((cell) => cell.piece === undefined)
    if (!firstEmptyCell) return "Column full!";

    this.addPieceToBoard(col, firstEmptyCell.position[1])

    this.checkWinner(this.board[firstEmptyCell.position[1]][col])
    if (this.checkWinner(this.board[firstEmptyCell.position[1]][col])) return `Player ${this.currentPlayer} wins!`

    const currentPlayer = this.currentPlayer
    this.switchPlayer();
    return `Player ${currentPlayer} has a turn`
  }

  printBoard() {
    console.log(this.board.map(x => x.map(y => y.toString())))
  }

  private buildBoard(): BoardCell[][] {
    return Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.columns }, (_, col) =>
        createBoardCell([col as Column, row as Row])))
  }

  private switchPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  private addPieceToBoard(col: number, firstEmptyRow: number) {
    this.board[firstEmptyRow][col] = {...this.board[firstEmptyRow][col], piece: this.currentPlayer }
  }

  private checkWinner(lastMove: BoardCell) {
    const { position, piece } = lastMove
    if (!piece) return;

    const [col, row] = position;
    if (this.checkDirection(row, col, 1, 0)
      || this.checkDirection(row, col, 0, 1)
      || this.checkDirection(row, col, 1, 1)
      || this.checkDirection(row, col, 1, -1)
    ) {
      this.gameWon = piece;
      return piece;
    }
  }

  private checkDirection(row: Row, col: Column, rowDir: number, colDir: number): boolean {
    let forwardCount = this.countConsecutive(row, col, rowDir, colDir);
    let backwardCount = this.countConsecutive(row, col, -rowDir, -colDir);
    return forwardCount + backwardCount - 1 >= 4;
  }

  private countConsecutive = (row: Row, col: Column, rowDir: number, colDir: number): number => {
    let count = 0;
    let r = row as number;
    let c = col as number;

    while(
      r >= 0 && r < this.rows &&
      c >= 0 && c < this.columns &&
      this.board[r as Row][c as Column].piece === this.currentPlayer
      ) {
        count++
        r += rowDir;
        c += colDir;
      }
    return count;
  }
}