/**
 * Estructura de datos que contiene los sujetos y sus verbos conectores.
 * Nota: La primera entrada contiene la frase completa requerida por el poema.
 */
const DATA = [
  { subject: 'house that Jack built', action: '' }, // La base del poema
  { subject: 'malt', action: 'lay in' },
  { subject: 'rat', action: 'ate' },
  { subject: 'cat', action: 'killed' },
  { subject: 'dog', action: 'worried' },
  { subject: 'cow with the crumpled horn', action: 'tossed' },
  { subject: 'maiden all forlorn', action: 'milked' },
  { subject: 'man all tattered and torn', action: 'kissed' },
  { subject: 'priest all shaven and shorn', action: 'married' },
  { subject: 'rooster that crowed in the morn', action: 'woke' },
  { subject: 'farmer sowing his corn', action: 'kept' },
  { subject: 'horse and the hound and the horn', action: 'belonged to' },
];

/**
 * Genera una sola estrofa del poema.
 * @param n El número de la estrofa (1 a 12).
 */
export function verse(n: number): string[] {
  const lines: string[] = [];
  
  // La línea inicial de cada estrofa: "This is the..."
  lines.push(`This is the ${DATA[n - 1].subject}`);

  // Construimos las líneas intermedias recorriendo hacia atrás
  // El bucle se detiene antes de llegar a la casa (índice 0)
  for (let i = n - 1; i > 0; i--) {
    lines.push(`that ${DATA[i].action} the ${DATA[i - 1].subject}`);
  }

  // Añadimos el punto final a la última línea de la estrofa
  lines[lines.length - 1] += '.';

  return lines;
}

/**
 * Genera un rango de estrofas unidas por líneas vacías.
 * @param start Estrofa inicial.
 * @param end Estrofa final.
 */
export function verses(start: number, end: number): string[] {
  let allLines: string[] = [];

  for (let i = start; i <= end; i++) {
    // Concatenamos las líneas de la estrofa actual
    allLines = allLines.concat(verse(i));
    
    // Si no es la última estrofa, añadimos un separador vacío
    if (i < end) {
      allLines.push('');
    }
  }

  return allLines;
}