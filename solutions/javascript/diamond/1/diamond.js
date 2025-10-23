export const rows = (letter) => {
  if (letter === 'A') {
    return ['A'];
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letterIndex = alphabet.indexOf(letter);
  const size = letterIndex * 2 + 1;
  const diamond = [];

  // Build top half including middle
  for (let i = 0; i <= letterIndex; i++) {
    const currentLetter = alphabet[i];
    const outerSpaces = ' '.repeat(letterIndex - i);
    
    if (i === 0) {
      // First row: single 'A' centered
      diamond.push(outerSpaces + currentLetter + outerSpaces);
    } else {
      // Middle rows: two letters with inner spaces
      const innerSpaces = ' '.repeat(i * 2 - 1);
      diamond.push(outerSpaces + currentLetter + innerSpaces + currentLetter + outerSpaces);
    }
  }

  // Build bottom half (reverse of top half excluding middle)
  for (let i = letterIndex - 1; i >= 0; i--) {
    const currentLetter = alphabet[i];
    const outerSpaces = ' '.repeat(letterIndex - i);
    
    if (i === 0) {
      // Last row: single 'A' centered
      diamond.push(outerSpaces + currentLetter + outerSpaces);
    } else {
      // Bottom rows: two letters with inner spaces
      const innerSpaces = ' '.repeat(i * 2 - 1);
      diamond.push(outerSpaces + currentLetter + innerSpaces + currentLetter + outerSpaces);
    }
  }

  return diamond;
};