export const eggCount = (displayValue: number): number => {
  let count = 0;
  let remaining = displayValue;
  
  // Count bits until the number becomes 0
  while (remaining > 0) {
    // Check if the least significant bit is 1
    if (remaining & 1) {
      count++;
    }
    // Shift right by 1 (divide by 2)
    remaining >>= 1;
  }
  
  return count;
};