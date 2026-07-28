export const translate = (rna) => {
  if (!rna) {
    return [];
  }
  
  const codonMap = {
    'AUG': 'Methionine',
    'UUU': 'Phenylalanine',
    'UUC': 'Phenylalanine',
    'UUA': 'Leucine',
    'UUG': 'Leucine',
    'UCU': 'Serine',
    'UCC': 'Serine',
    'UCA': 'Serine',
    'UCG': 'Serine',
    'UAU': 'Tyrosine',
    'UAC': 'Tyrosine',
    'UGU': 'Cysteine',
    'UGC': 'Cysteine',
    'UGG': 'Tryptophan',
    'UAA': 'STOP',
    'UAG': 'STOP',
    'UGA': 'STOP'
  };
  
  const proteins = [];
  
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    
    // Check if codon length is valid (3 characters)
    if (codon.length < 3) {
      throw new Error('Invalid codon');
    }
    
    // Check if codon exists in the map
    if (!codonMap[codon]) {
      throw new Error('Invalid codon');
    }
    
    // Check if codon is a STOP codon
    if (codonMap[codon] === 'STOP') {
      break;
    }
    
    proteins.push(codonMap[codon]);
  }
  
  return proteins;
};