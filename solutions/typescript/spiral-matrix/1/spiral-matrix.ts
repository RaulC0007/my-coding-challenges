/**
 * Genera una matriz cuadrada de tamaño `size` rellena con números del 1 al size^2
 * en orden espiral (sentido de las agujas del reloj).
 * * @param size El tamaño de los lados de la matriz.
 * @returns number[][] La matriz bidimensional espiral.
 */
export function ofSize(size: number): number[][] {
  // 1. Inicializar la matriz con arrays vacíos rellenos de ceros
  const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(0));

  let counter = 1;
  let top = 0;
  let bottom = size - 1;
  let left = 0;
  let right = size - 1;

  // 2. Iterar mientras las fronteras de la matriz no se crucen
  while (top <= bottom && left <= right) {
    
    // Movimiento 1: Izquierda a Derecha en la fila superior
    for (let i = left; i <= right; i++) {
      matrix[top][i] = counter++;
    }
    top++; // Reducimos el límite superior

    // Movimiento 2: Arriba a Abajo en la columna derecha
    for (let i = top; i <= bottom; i++) {
      matrix[i][right] = counter++;
    }
    right--; // Reducimos el límite derecho

    // Movimiento 3: Derecha a Izquierda en la fila inferior
    // Condición extra por si 'top' y 'bottom' ya se cruzaron tras el movimiento anterior
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        matrix[bottom][i] = counter++;
      }
      bottom--; // Reducimos el límite inferior
    }

    // Movimiento 4: Abajo a Arriba en la columna izquierda
    // Condición extra por si 'left' y 'right' ya se cruzaron
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        matrix[i][left] = counter++;
      }
      left++; // Reducimos el límite izquierdo
    }
  }

  return matrix;
}