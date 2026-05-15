export function proverb(...words: string[]): string {
  if (words.length === 0) {
    return '';
  }
  
  const result: string[] = [];
  
  // Generate the "For want of X the Y was lost." lines
  for (let i = 0; i < words.length - 1; i++) {
    result.push(`For want of a ${words[i]} the ${words[i + 1]} was lost.`);
  }
  
  // Add the final line
  result.push(`And all for the want of a ${words[0]}.`);
  
  return result.join('\n');
}