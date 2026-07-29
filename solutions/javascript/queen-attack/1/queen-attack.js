export class QueenAttack {
  constructor({
    black: [blackRow, blackColumn] = [0, 3],
    white: [whiteRow, whiteColumn] = [7, 3],
  } = {}) {
    
    // Validate that the positions are within the 8x8 board boundaries
    const isOutOfBounds = (row, col) => row < 0 || row > 7 || col < 0 || col > 7;
    
    if (isOutOfBounds(blackRow, blackColumn) || isOutOfBounds(whiteRow, whiteColumn)) {
      throw new Error('Queen must be placed on the board');
    }

    // Validate that the queens do not occupy the same position
    if (blackRow === whiteRow && blackColumn === whiteColumn) {
      throw new Error('Queens cannot share the same space');
    }

    this.black = [blackRow, blackColumn];
    this.white = [whiteRow, whiteColumn];
  }

  toString() {
    // Create an 8x8 grid filled with underscores
    const board = Array.from({ length: 8 }, () => Array(8).fill('_'));
    
    // Place the queens on the board
    board[this.white[0]][this.white[1]] = 'W';
    board[this.black[0]][this.black[1]] = 'B';
    
    // Join the rows with spaces, and the board with newlines
    return board.map(row => row.join(' ')).join('\n');
  }

  get canAttack() {
    const [bRow, bCol] = this.black;
    const [wRow, wCol] = this.white;

    const sameRow = bRow === wRow;
    const sameColumn = bCol === wCol;
    
    // They share a diagonal if the distance moved horizontally equals the distance moved vertically
    const sameDiagonal = Math.abs(bRow - wRow) === Math.abs(bCol - wCol);

    return sameRow || sameColumn || sameDiagonal;
  }
}
