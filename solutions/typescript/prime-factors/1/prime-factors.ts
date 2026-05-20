export function calculatePrimeFactors(n: number): number[] {
  if (n < 1) {
    throw new Error('Number must be a natural number (positive integer)');
  }
  
  if (n === 1) {
    return [];
  }
  
  const factors: number[] = [];
  let remaining = n;
  
  // Check for factor 2 repeatedly
  while (remaining % 2 === 0) {
    factors.push(2);
    remaining /= 2;
  }
  
  // Check for odd factors from 3 to sqrt(remaining)
  let divisor = 3;
  while (divisor * divisor <= remaining) {
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining /= divisor;
    }
    divisor += 2; // Skip even numbers
  }
  
  // If remaining is greater than 1, it's a prime factor
  if (remaining > 1) {
    factors.push(remaining);
  }
  
  return factors;
}