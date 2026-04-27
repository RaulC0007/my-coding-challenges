export function nucleotideCounts(dna: string): Record<string, number> {
  const counts: Record<string, number> = {
    A: 0,
    C: 0,
    G: 0,
    T: 0
  };
  
  for (const nucleotide of dna) {
    if (!counts.hasOwnProperty(nucleotide)) {
      throw new Error('Invalid nucleotide in strand');
    }
    counts[nucleotide]++;
  }
  
  return counts;
}