export function recite(startBottles: number, takeDown: number): string[] {
  const result: string[] = [];
  
  const numberToWord: { [key: number]: string } = {
    1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
    6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten'
  };
  
  for (let i = 0; i < takeDown; i++) {
    const current = startBottles - i;
    const next = current - 1;
    
    const currentWord = numberToWord[current];
    const nextWord = next === 0 ? 'no' : numberToWord[next].toLowerCase();
    const bottleText = current === 1 ? 'bottle' : 'bottles';
    const nextBottleText = next === 1 ? 'bottle' : 'bottles';
    
    result.push(`${currentWord} green ${bottleText} hanging on the wall,`);
    result.push(`${currentWord} green ${bottleText} hanging on the wall,`);
    result.push(`And if one green bottle should accidentally fall,`);
    result.push(`There'll be ${nextWord} green ${nextBottleText} hanging on the wall.`);
    
    if (i < takeDown - 1) {
      result.push('');
    }
  }
  
  return result;
}