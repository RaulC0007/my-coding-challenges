export function sum(multiples: number[], level: number): number {
  if (level <= 0) return 0;
  
  // Remove zeros and negatives, and deduplicate
  const bases = [...new Set(multiples.filter(m => m > 0))];
  
  if (bases.length === 0) return 0;
  
  let total = 0;
  
  for (let i = 1; i < level; i++) {
    if (bases.some(base => i % base === 0)) {
      total += i;
    }
  }
  
  return total;
}