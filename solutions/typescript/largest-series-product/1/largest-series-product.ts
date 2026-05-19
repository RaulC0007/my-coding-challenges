export const largestProduct = (digits: string, span: number): number => {
  if (span < 0) {
    throw new Error('Span must not be negative');
  }
  
  if (span === 0) {
    return 1;
  }
  
  if (span > digits.length) {
    throw new Error('Span must not exceed string length');
  }
  
  if (!/^\d+$/.test(digits)) {
    throw new Error('Digits input must only contain digits');
  }
  
  const numbers = digits.split('').map(Number);
  let maxProduct = 0;
  
  // Handle case where there are zeros - we can skip those windows
  for (let i = 0; i <= numbers.length - span; i++) {
    let product = 1;
    let hasZero = false;
    
    for (let j = i; j < i + span; j++) {
      if (numbers[j] === 0) {
        hasZero = true;
        break;
      }
      product *= numbers[j];
    }
    
    if (!hasZero && product > maxProduct) {
      maxProduct = product;
    }
  }
  
  return maxProduct;
};