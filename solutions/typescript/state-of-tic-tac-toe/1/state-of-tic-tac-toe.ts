export type State = 'ongoing' | 'draw' | 'win';

export const gamestate = (board: string[]): State => {
  const grid = board.map(row => row.split(''));
  let xCount = 0;
  let oCount = 0;

  // 1. Count marks
  for (const row of grid) {
    for (const cell of row) {
      if (cell === 'X') xCount++;
      if (cell === 'O') oCount++;
    }
  }

  // 2. Validate turn order (X starts)
  if (oCount > xCount) {
    throw new Error('Wrong turn order: O started');
  }
  if (xCount > oCount + 1) {
    throw new Error('Wrong turn order: X went twice');
  }

  // 3. Function to check winners
  const checkWin = (p: string): boolean => {
    const lines = [
      // Rows
      [grid[0][0], grid[0][1], grid[0][2]],
      [grid[1][0], grid[1][1], grid[1][2]],
      [grid[2][0], grid[2][1], grid[2][2]],
      // Columns
      [grid[0][0], grid[1][0], grid[2][0]],
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      // Diagonals
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[0][2], grid[1][1], grid[2][0]],
    ];
    return lines.some(line => line.every(cell => cell === p));
  };

  const xWins = checkWin('X');
  const oWins = checkWin('O');

  // 4. Validate if game continued after win
  if (xWins && oWins) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }
  
  // If X won, X must have one more move than O (X was last to move)
  if (xWins && xCount === oCount) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }

  // If O won, X and O must have equal moves (O was last to move)
  if (oWins && xCount > oCount) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }

  // 5. Return final state
  if (xWins || oWins) return 'win';
  if (xCount + oCount === 9) return 'draw';
  
  return 'ongoing';
};