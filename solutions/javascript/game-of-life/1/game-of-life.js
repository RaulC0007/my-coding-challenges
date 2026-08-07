//
// This is only a SKELETON file for the 'Conway's Game of Life' exercise. It's been provided
// as a convenience to get you started writing code faster.
//

export class GameOfLife {
  constructor(matrix) {
    this.matrix = matrix;
  }

  tick() {
    const rows = this.matrix.length;
    if (rows === 0) return; // Caso base: matriz vacía
    const cols = this.matrix[0].length;
    
    // Creamos una nueva matriz para la siguiente generación (inicializada en 0)
    const nextMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    
    // Las 8 direcciones posibles para los vecinos (horizontal, vertical, diagonal)
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let liveNeighbors = 0;
        
        // Contamos los vecinos vivos
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          
          // Verificamos que el vecino esté dentro de los límites de la matriz
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            liveNeighbors += this.matrix[nr][nc];
          }
        }
        
        // Aplicamos las reglas del Juego de la Vida
        const isAlive = this.matrix[r][c] === 1;
        
        if (isAlive && (liveNeighbors === 2 || liveNeighbors === 3)) {
          nextMatrix[r][c] = 1; // Sobrevive
        } else if (!isAlive && liveNeighbors === 3) {
          nextMatrix[r][c] = 1; // Nace
        } else {
          nextMatrix[r][c] = 0; // Muere o sigue muerta
        }
      }
    }
    
    // Actualizamos la matriz del estado actual a la nueva generación
    this.matrix = nextMatrix;
  }

  state() {
    return this.matrix;
  }
}