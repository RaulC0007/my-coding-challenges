export function parse(phrase: string): string {
  if (!phrase) return '';

  // 1. Limpieza inicial: Convertimos guiones bajos en espacios para facilitar el split
  // y separamos por espacios o guiones.
  const words = phrase.replace(/_/g, ' ').split(/[\s-]+/);

  let acronym = '';

  for (const word of words) {
    // 2. Eliminamos caracteres no alfabéticos
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (cleanWord.length === 0) continue;

    // 3. Lógica de extracción:
    // Si la palabra es puramente mayúsculas (como PHP), solo tomamos la primera letra
    // para evitar el error "PHPHP". 
    const isAllCaps = cleanWord === cleanWord.toUpperCase();

    if (isAllCaps) {
      acronym += cleanCondition(cleanWord[0]);
    } else {
      // Para palabras normales o camelCase (ej: HyperText)
      for (let i = 0; i < cleanWord.length; i++) {
        const char = cleanWord[i];
        // Tomamos la primera letra siempre, y las mayúsculas siguientes
        if (i === 0 || char === char.toUpperCase()) {
          acronym += char.toUpperCase();
        }
      }
    }
  }

  return acronym;
}

// Función auxiliar para asegurar que devolvemos mayúsculas limpias
function cleanCondition(char: string): string {
  return char ? char.toUpperCase() : '';
}