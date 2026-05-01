export function classify(number: number): string {
  // Check if the number is positive
  if (number <= 0) {
    throw new Error('Classification is only possible for natural numbers.');
  }
  
  // Find the aliquot sum (sum of all proper divisors)
  let aliquotSum = 0;
  for (let i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      aliquotSum += i;
    }
  }
  
  // Classify the number based on its aliquot sum
  if (aliquotSum === number) {
    return 'perfect';
  } else if (aliquotSum > number) {
    return 'abundant';
  } else {
    return 'deficient';
  }
}