export function transform(oldData: Record<number, string[]>): Record<string, number> {
  const newData: Record<string, number> = {};
  
  for (const [score, letters] of Object.entries(oldData)) {
    for (const letter of letters) {
      newData[letter.toLowerCase()] = Number(score);
    }
  }
  
  return newData;
}