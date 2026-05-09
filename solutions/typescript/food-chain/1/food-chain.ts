interface Animal {
  name: string;
  description: string;
  specialResponse: string;
}

const animalsData: Animal[] = [
  { name: 'fly', description: '', specialResponse: '' },
  { name: 'spider', description: 'It wriggled and jiggled and tickled inside her.', specialResponse: ' that wriggled and jiggled and tickled inside her' },
  { name: 'bird', description: 'How absurd to swallow a bird!', specialResponse: '' },
  { name: 'cat', description: 'Imagine that, to swallow a cat!', specialResponse: '' },
  { name: 'dog', description: 'What a hog, to swallow a dog!', specialResponse: '' },
  { name: 'goat', description: 'Just opened her throat and swallowed a goat!', specialResponse: '' },
  { name: 'cow', description: 'I don\'t know how she swallowed a cow!', specialResponse: '' },
  { name: 'horse', description: '', specialResponse: '' }
];

function buildChain(verseNumber: number): string {
  const chain: string[] = [];
  
  // Build chain from current animal down to spider
  for (let i = verseNumber; i > 1; i--) {
    const currentAnimal = animalsData[i];
    const previousAnimal = animalsData[i - 1];
    let line = `She swallowed the ${currentAnimal.name} to catch the ${previousAnimal.name}`;
    
    if (previousAnimal.name === 'spider') {
      line += ` that wriggled and jiggled and tickled inside her`;
    }
    line += '.';
    chain.push(line);
  }
  
  return chain.join('\n');
}

export function verse(verseNumber: number): string {
  if (verseNumber < 1 || verseNumber > 8) {
    throw new Error('Verse number must be between 1 and 8');
  }
  
  const index = verseNumber - 1;
  const animal = animalsData[index];
  
  if (animal.name === 'horse') {
    return `I know an old lady who swallowed a horse.\nShe's dead, of course!\n`;
  }
  
  let result = `I know an old lady who swallowed a ${animal.name}.\n`;
  
  if (animal.description) {
    result += `${animal.description}\n`;
  }
  
  if (verseNumber > 1) {
    const chain = buildChain(verseNumber - 1);
    if (chain) {
      result += `${chain}\n`;
    }
    result += `She swallowed the spider to catch the fly.\n`;
  }
  
  result += `I don't know why she swallowed the fly. Perhaps she'll die.\n`;
  
  return result;
}

export function verses(start: number, end: number): string {
  const versesList: string[] = [];
  
  for (let i = start; i <= end; i++) {
    versesList.push(verse(i));
  }
  
  return versesList.join('\n');
}