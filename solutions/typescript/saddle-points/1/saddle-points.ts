type Point = {
  row: number;
  column: number;
};

/**
 * Encuentra todos los puntos de silla (Saddle Points) en una matriz dada.
 * * @param matrix - Matriz bidimensional de números que representa las alturas de los árboles.
 * @returns Point[] - Lista de coordenadas (basadas en índice 1) de los puntos de silla hallados.
 */
export function saddlePoints(matrix: number[][]): Point[] {
  const result: Point[] = [];

  // Casos extremos: matriz vacía o filas vacías
  if (matrix.length === 0 || matrix[0].length === 0) {
    return result;
  }

  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  // 1. Encontrar el valor máximo de cada fila
  const rowMaxs = matrix.map(row => Math.max(...row));

  // 2. Encontrar el valor mínimo de cada columna
  const colMins: number[] = [];
  for (let c = 0; c < colCount; c++) {
    let min = Infinity;
    for (let r = 0; r < rowCount; r++) {
      if (matrix[r][c] < min) {
        min = matrix[r][c];
      }
    }
    colMins.push(min);
  }

  // 3. Evaluar qué coordenadas cumplen ambas condiciones simultáneamente
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      const currentElement = matrix[r][c];

      // Si es el mayor de su fila y el menor de su columna, es un punto válido
      if (currentElement === rowMaxs[r] && currentElement === colMins[c]) {
        result.push({
          row: r + 1,      // Ajuste a índice basado en 1
          column: c + 1   // Ajuste a índice basado en 1
        });
      }
    }
  }

  return result;
}