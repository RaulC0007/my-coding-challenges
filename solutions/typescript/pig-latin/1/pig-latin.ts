export function translate(phrase: string): string {
  // Dividimos la frase en palabras y traducimos cada una
  return phrase.split(' ').map(translateWord).join(' ');
}

function translateWord(word: string): string {
  // Regla 1: Comienza con vocal, 'xr' o 'yt'
  if (/^([aeiou]|xr|yt)/.test(word)) {
    return word + 'ay';
  }

  // Regla 3: Consonantes opcionales seguidas de 'qu'
  const rule3Match = word.match(/^([^aeiou]*qu)(.*)/);
  if (rule3Match) {
    return rule3Match[2] + rule3Match[1] + 'ay';
  }

  // Regla 4: Una o más consonantes seguidas de 'y'
  const rule4Match = word.match(/^([^aeiou]+)(y.*)/);
  if (rule4Match) {
    return rule4Match[2] + rule4Match[1] + 'ay';
  }

  // Regla 2: Una o más consonantes al inicio
  const rule2Match = word.match(/^([^aeiou]+)(.*)/);
  if (rule2Match) {
    return rule2Match[2] + rule2Match[1] + 'ay';
  }

  return word;
}