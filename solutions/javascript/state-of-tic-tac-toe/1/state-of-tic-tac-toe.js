export const gamestate = (board) => {
  // Validación de estructura inicial
  if (!Array.isArray(board) || board.length !== 3) {
    throw new Error('Invalid board');
  }

  let xCount = 0;
  let oCount = 0;
  const grid = [];

  for (let i = 0; i < 3; i++) {
    if (typeof board[i] !== 'string' || board[i].length !== 3) {
      throw new Error('Invalid board');
    }
    grid.push(board[i].split(''));
    for (let char of grid[i]) {
      if (char === 'X') xCount++;
      else if (char === 'O') oCount++;
      else if (char !== ' ') throw new Error('Invalid board');
    }
  }

  // Validación de turnos
  if (oCount > xCount) {
    throw new Error('Wrong turn order: O started');
  }
  if (xCount > oCount + 1) {
    throw new Error('Wrong turn order: X went twice');
  }

  // Detección de ganadores
  const hasWinner = (player) => {
    const lines = [
      ...grid, // filas
      [grid[0][0], grid[1][0], grid[2][0]], // columnas
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      [grid[0][0], grid[1][1], grid[2][2]], // diagonales
      [grid[0][2], grid[1][1], grid[2][0]]
    ];
    return lines.some(line => line.every(cell => cell === player));
  };

  const xWins = hasWinner('X');
  const oWins = hasWinner('O');

  // Validación de estados imposibles con mensajes exactos requeridos
  if (xWins && oWins) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }
  if (xWins && xCount !== oCount + 1) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }
  if (oWins && xCount !== oCount) {
    throw new Error('Impossible board: game should have ended after the game was won');
  }

  // Determinación del estado
  if (xWins || oWins) return 'win';
  if (xCount + oCount === 9) return 'draw';
  return 'ongoing';
};