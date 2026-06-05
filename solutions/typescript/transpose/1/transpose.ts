/**
 * Transpone una matriz de strings (filas se convierten en columnas).
 * Maneja filas de longitudes desiguales aplicando las reglas de relleno específicas.
 * * @param input - Arreglo de strings que representan las líneas originales.
 * @returns Arreglo de strings transpuesto.
 */
export function transpose(input: string[]): string[] {
  if (input.length === 0) {
    return [];
  }

  // 1. Encontrar la longitud de la línea más larga para saber cuántas filas de salida tendremos
  const maxCols = Math.max(...input.map(row => row.length));
  const result: string[] = [];

  // 2. Iterar a través de cada columna de la matriz original (que será una nueva fila)
  for (let c = 0; c < maxCols; c++) {
    let currentNewRow = '';

    // Iterar a través de cada fila de la matriz original
    for (let r = 0; r < input.length; r++) {
      const char = input[r][c];

      if (char !== undefined) {
        currentNewRow += char;
      } else {
        // Si el carácter no existe en la fila 'r', verificamos si alguna de las
        // FILAS SIGUIENTES (r + 1 en adelante) es lo suficientemente larga como para alcanzar esta columna 'c'.
        const hasLongerRowAhead = input.slice(r + 1).some(nextRow => nextRow.length > c);

        if (hasLongerRowAhead) {
          currentNewRow += ' ';
        } else {
          // Si ninguna fila posterior necesita esta columna, detenemos el procesamiento
          // de la fila actual para no rellenar espacios a la derecha de forma innecesaria.
          break;
        }
      }
    }

    result.push(currentNewRow);
  }

  return result;
}