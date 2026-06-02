// Diccionario estricto con las firmas de los 10 dígitos posibles (3x4 = 12 caracteres cada uno)
const DIGIT_PATTERNS: { [key: string]: string } = {
  ' _ | ||_|   ': '0',
  '     |  |   ': '1',
  ' _  _||_    ': '2',
  ' _  _| _|   ': '3',
  '   |_|  |   ': '4',
  ' _ |_  _|   ': '5',
  ' _ |_ |_|   ': '6',
  ' _   |  |   ': '7',
  ' _ |_||_|   ': '8',
  ' _ |_| _|   ': '9'
};

/**
 * Convierte un diagrama de texto ASCII en una cadena legible de números decimales.
 * * @param inputTexto - El texto crudo con saltos de línea (\n).
 */
export function convert(inputTexto: string): string {
  const lines = inputTexto.split('\n');

  // 1. Validaciones de dimensiones requeridas
  if (lines.length % 4 !== 0) {
    throw new Error('Number of lines must be a multiple of four.');
  }
  if (lines.some(line => line.length % 3 !== 0)) {
    throw new Error('Number of columns must be a multiple of three.');
  }

  const resultLines: string[] = [];

  // 2. Procesar bloques verticales de 4 filas cada uno
  for (let r = 0; r < lines.length; r += 4) {
    let currentLineDigits = '';
    const totalColumns = lines[r].length;

    // 3. Procesar bloques horizontales de 3 columnas dentro de las 4 filas vigentes
    for (let c = 0; c < totalColumns; c += 3) {
      
      // Reconstruimos la celda de 3x4 en un string plano continuo de longitud 12
      let digitString = '';
      for (let i = 0; i < 4; i++) {
        digitString += lines[r + i].substring(c, c + 3);
      }

      // 4. Comparación con el catálogo o fallback a '?'
      const recognizedDigit = DIGIT_PATTERNS[digitString] || '?';
      currentLineDigits += recognizedDigit;
    }

    resultLines.push(currentLineDigits);
  }

  // 5. Unir las líneas procesadas intercalando una coma tal como exige el enunciado
  return resultLines.join(',');
}