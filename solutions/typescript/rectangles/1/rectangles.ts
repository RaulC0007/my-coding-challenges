type Corner = { r: number; c: number };

export function count(grid: string[]): number {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const corners: Corner[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // 1. Identificar y almacenar la ubicación de todas las esquinas '+'
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '+') {
        corners.push({ r, c });
      }
    }
  }

  let rectangleCount = 0;

  // 2. Evaluar combinaciones de esquinas
  for (let i = 0; i < corners.length; i++) {
    const topLeft = corners[i];

    for (let j = i + 1; j < corners.length; j++) {
      const topRight = corners[j];

      // Tienen que estar en la misma fila y a la derecha
      if (topLeft.r !== topRight.r || topLeft.c >= topRight.c) {
        continue;
      }

      // Verificamos si el segmento horizontal superior está conectado continuamente
      if (!hasHorizontalLine(grid, topLeft.r, topLeft.c, topRight.c)) {
        continue;
      }

      // 3. Buscar posibles parejas inferiores para este par de arriba
      for (let k = j + 1; k < corners.length; k++) {
        const bottomLeft = corners[k];

        // Debe estar alineado verticalmente debajo de topLeft
        if (bottomLeft.c !== topLeft.c || bottomLeft.r <= topLeft.r) {
          continue;
        }

        // Busquemos ahora la cuarta esquina (bottomRight)
        const bottomRight = corners.find(
          (corner) => corner.r === bottomLeft.r && corner.c === topRight.c
        );

        if (!bottomRight) {
          continue; // Si falta la esquina inferior derecha, no hay rectángulo
        }

        // 4. Validar las 3 líneas restantes (inferior, izquierda y derecha)
        if (
          hasHorizontalLine(grid, bottomLeft.r, bottomLeft.c, bottomRight.c) &&
          hasVerticalLine(grid, topLeft.c, topLeft.r, bottomLeft.r) &&
          hasVerticalLine(grid, topRight.c, topRight.r, bottomRight.r)
        ) {
          rectangleCount++;
        }
      }
    }
  }

  return rectangleCount;
}

/**
 * Verifica si existe un trazo horizontal continuo entre dos columnas.
 * Los caracteres válidos para líneas horizontales son '-' y '+'.
 */
function hasHorizontalLine(grid: string[], r: number, c1: number, c2: number): boolean {
  for (let c = c1; c <= c2; c++) {
    const char = grid[r][c];
    if (char !== '-' && char !== '+') {
      return false;
    }
  }
  return true;
}

/**
 * Verifica si existe un trazo vertical continuo entre dos filas.
 * Los caracteres válidos para líneas verticales son '|' y '+'.
 */
function hasVerticalLine(grid: string[], c: number, r1: number, r2: number): boolean {
  for (let r = r1; r <= r2; r++) {
    const char = grid[r][c];
    if (char !== '|' && char !== '+') {
      return false;
    }
  }
  return true;
}