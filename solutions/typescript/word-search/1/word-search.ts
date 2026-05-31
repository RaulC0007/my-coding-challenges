type Coordinate = [number, number];
type WordLocation = { start: Coordinate; end: Coordinate };
type SearchResult = { [word: string]: WordLocation | undefined };

export class WordSearch {
  private grid: string[];
  private numRows: number;
  private numCols: number;

  // Las 8 direcciones posibles expresadas como [cambio_fila, cambio_columna]
  private readonly directions: Coordinate[] = [
    [0, 1],   // Horizontal Derecha
    [0, -1],  // Horizontal Izquierda
    [1, 0],   // Vertical Abajo
    [-1, 0],  // Vertical Arriba
    [1, 1],   // Diagonal Abajo-Derecha
    [1, -1],  // Diagonal Abajo-Izquierda
    [-1, 1],  // Diagonal Arriba-Derecha
    [-1, -1]  // Diagonal Arriba-Izquierda
  ];

  constructor(grid: string[]) {
    this.grid = grid;
    this.numRows = grid.length;
    this.numCols = grid.length > 0 ? grid[0].length : 0;
  }

  /**
   * Busca una lista de palabras dentro de la sopa de letras.
   * @param words - Arreglo de strings con las palabras a buscar.
   * @returns Un objeto con los resultados y las coordenadas encontradas.
   */
  public find(words: string[]): SearchResult {
    const result: SearchResult = {};

    for (const word of words) {
      result[word] = this.findWord(word);
    }

    return result;
  }

  /**
   * Intenta localizar una única palabra en todo el tablero.
   */
  private findWord(word: string): WordLocation | undefined {
    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        // Optimización: Solo empezamos a buscar si la primera letra coincide
        if (this.grid[r][c] === word[0]) {
          
          // Probamos en las 8 direcciones geométricas
          for (const [dr, dc] of this.directions) {
            const endCoords = this.checkDirection(word, r, c, dr, dc);
            
            if (endCoords) {
              return {
                // Sumamos 1 para convertir de índice base-0 a coordenadas reales base-1
                start: [r + 1, c + 1],
                end: [endCoords[0] + 1, endCoords[1] + 1]
              };
            }
          }

        }
      }
    }
    return undefined; // Si no se encuentra la palabra en ningún lado
  }

  /**
   * Camina en una dirección específica buscando si se completa la palabra de forma contigua.
   */
  private checkDirection(
    word: string,
    startRow: number,
    startCol: number,
    dr: number,
    dc: number
  ): Coordinate | null {
    let r = startRow;
    let c = startCol;

    for (let i = 1; i < word.length; i++) {
      r += dr;
      c += dc;

      // Validación de fronteras de la matriz
      if (r < 0 || r >= this.numRows || c < 0 || c >= this.numCols) {
        return null;
      }

      // Validación de coincidencia de caracteres
      if (this.grid[r][c] !== word[i]) {
        return null;
      }
    }

    // Si el bucle termina con éxito, devolvemos las coordenadas de la última letra
    return [r, c];
  }
}