//
// This is only a SKELETON file for the 'Bottle Song' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const NUM_WORDS = [
  'no', 'one', 'two', 'three', 'four', 'five', 
  'six', 'seven', 'eight', 'nine', 'ten'
];

// Formatea la frase para las primeras dos líneas de la estrofa (inicia con mayúscula)
function getBottlesStart(n) {
  const word = NUM_WORDS[n].charAt(0).toUpperCase() + NUM_WORDS[n].slice(1);
  const bottleWord = n === 1 ? 'bottle' : 'bottles';
  return `${word} green ${bottleWord}`;
}

// Formatea la frase para la última línea de la estrofa (inicia con minúscula)
function getBottlesEnd(n) {
  const word = NUM_WORDS[n];
  const bottleWord = n === 1 ? 'bottle' : 'bottles';
  return `${word} green ${bottleWord}`;
}

export const recite = (initialBottlesCount, takeDownCount) => {
  const verses = [];
  
  for (let i = 0; i < takeDownCount; i++) {
    const current = initialBottlesCount - i;
    const next = current - 1;
    
    // Generamos las 4 líneas de la estrofa actual
    const line1 = `${getBottlesStart(current)} hanging on the wall,`;
    const line2 = `${getBottlesStart(current)} hanging on the wall,`;
    const line3 = `And if one green bottle should accidentally fall,`;
    const line4 = `There'll be ${getBottlesEnd(next)} hanging on the wall.`;
    
    verses.push(line1, line2, line3, line4);
    
    // Si no es la última estrofa que vamos a cantar, añadimos una línea vacía
    if (i < takeDownCount - 1) {
      verses.push('');
    }
  }
  
  return verses;
};