export function toRna(dna: string): string {
  const complement: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  };
  
  let rna = '';
  
  for (const nucleotide of dna) {
    if (!complement[nucleotide]) {
      // The test suite specifically expects this error message
      throw new Error('Invalid input DNA.');
    }
    rna += complement[nucleotide];
  }
  
  return rna;
}