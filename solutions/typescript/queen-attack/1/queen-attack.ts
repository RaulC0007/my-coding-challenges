type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}

export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  constructor({ white = [7, 3], black = [0, 3] }: Partial<Positions> = {}) {
    // Check if positions are valid (within 0-7)
    if (!this.isValidPosition(white) || !this.isValidPosition(black)) {
      throw new Error('Queen must be placed on the board');
    }
    
    // Check if queens are on the same position
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error('Queens cannot share the same space');
    }
    
    this.white = white;
    this.black = black;
  }

  private isValidPosition(position: Position): boolean {
    const [row, col] = position;
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  get canAttack(): boolean {
    const [whiteRow, whiteCol] = this.white;
    const [blackRow, blackCol] = this.black;
    
    // Same row
    if (whiteRow === blackRow) return true;
    
    // Same column
    if (whiteCol === blackCol) return true;
    
    // Same diagonal (difference in rows equals difference in columns)
    if (Math.abs(whiteRow - blackRow) === Math.abs(whiteCol - blackCol)) return true;
    
    return false;
  }

  toString(): string {
    const board: string[][] = [];
    
    // Initialize empty board
    for (let i = 0; i < 8; i++) {
      board.push(new Array(8).fill('_'));
    }
    
    // Place queens (row 0 is top row, row 7 is bottom row)
    const [whiteRow, whiteCol] = this.white;
    const [blackRow, blackCol] = this.black;
    
    board[whiteRow][whiteCol] = 'W';
    board[blackRow][blackCol] = 'B';
    
    // Convert to string representation
    return board.map(row => row.join(' ')).join('\n');
  }
}