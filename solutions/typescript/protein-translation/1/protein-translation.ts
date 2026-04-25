export function translate(rna: string = ''): string[] {
  const codonMap: { [key: string]: string } = {
    AUG: 'Methionine',
    UUU: 'Phenylalanine', UUC: 'Phenylalanine',
    UUA: 'Leucine', UUG: 'Leucine',
    UCU: 'Serine', UCC: 'Serine', UCA: 'Serine', UCG: 'Serine',
    UAU: 'Tyrosine', UAC: 'Tyrosine',
    UGU: 'Cysteine', UGC: 'Cysteine',
    UGG: 'Tryptophan',
    UAA: 'STOP', UAG: 'STOP', UGA: 'STOP'
  };
  
  const proteins: string[] = [];
  
  // Process RNA in groups of 3
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    
    // Check if we have a complete codon
    if (codon.length !== 3) {
      throw new Error('Invalid codon');
    }
    
    const protein = codonMap[codon];
    
    // If codon is not in the map, throw error
    if (!protein) {
      throw new Error('Invalid codon');
    }
    
    // If we hit a STOP codon, stop processing
    if (protein === 'STOP') {
      break;
    }
    
    proteins.push(protein);
  }
  
  return proteins;
}