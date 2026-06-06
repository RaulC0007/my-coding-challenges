export function valid(digitString: unknown): boolean {
  // Validate input type
  if (typeof digitString !== 'string') {
    return false;
  }
  
  // Remove all spaces
  const digitsOnly = digitString.replace(/\s/g, '');
  
  // Rule 1: Strings of length 1 or less are not valid
  if (digitsOnly.length <= 1) {
    return false;
  }
  
  // Rule 2: All other non-digit characters are disallowed
  if (!/^\d+$/.test(digitsOnly)) {
    return false;
  }
  
  // Convert string to array of numbers
  const numbers = digitsOnly.split('').map(Number);
  
  let totalSum = 0;
  
  // Process from right to left
  for (let i = numbers.length - 1; i >= 0; i--) {
    let value = numbers[i];
    
    // Count positions from the right (0-based from the rightmost digit)
    const positionFromRight = numbers.length - 1 - i;
    
    // Double every second digit (odd positions from the right)
    if (positionFromRight % 2 === 1) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }
    
    totalSum += value;
  }
  
  return totalSum % 10 === 0;
}