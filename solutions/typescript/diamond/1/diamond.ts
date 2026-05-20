export function makeDiamond(character: string): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charIndex = letters.indexOf(character.toUpperCase());
  
  if (charIndex === -1) {
    throw new Error('Invalid character. Must be a letter A-Z.');
  }
  
  const size = charIndex * 2 + 1;
  const result: string[] = [];
  
  for (let i = 0; i <= charIndex; i++) {
    const letter = letters[i];
    const spacesOutside = charIndex - i;
    const spacesInside = i * 2 - 1;
    
    let row: string;
    
    if (i === 0) {
      // First row with single 'A'
      row = ' '.repeat(spacesOutside) + letter + ' '.repeat(spacesOutside);
    } else {
      // Middle rows with two letters
      row = ' '.repeat(spacesOutside) + letter + ' '.repeat(spacesInside) + letter + ' '.repeat(spacesOutside);
    }
    
    result.push(row);
  }
  
  // Add bottom half (mirror of top half excluding the middle row)
  for (let i = charIndex - 1; i >= 0; i--) {
    result.push(result[i]);
  }
  
  return result.join('\n') + '\n';
}