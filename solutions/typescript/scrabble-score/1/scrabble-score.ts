export function score(word: string | undefined): number {
  // 1. Manejo de casos nulos o vacíos
  if (!word) {
    return 0;
  }

  // 2. Definición del diccionario de valores
  // Usamos Record<string, number> para tipar el objeto en TypeScript
  const letterValues: Record<string, number> = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };

  // 3. Cálculo de la puntuación
  // Convertimos a mayúsculas, separamos en letras y sumamos
  return word
    .toUpperCase()
    .split('')
    .reduce((total, letter) => {
      // Si la letra existe en el mapa, sumamos su valor, si no (como un espacio), sumamos 0
      return total + (letterValues[letter] || 0);
    }, 0);
}