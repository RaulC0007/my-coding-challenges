export const combinations = (cage) => {
  const { sum, size, exclude } = cage;
  
  // Validate input
  if (sum < 1 || size < 1 || size > 9) {
    return [];
  }
  
  const result = [];
  
  // Start recursive backtracking
  findCombinations(sum, size, exclude || [], 1, [], result);
  
  return result;
};

function findCombinations(remainingSum, remainingSize, exclude, start, current, result) {
  // Base case: we've found a valid combination
  if (remainingSize === 0) {
    if (remainingSum === 0) {
      // Check if this combination is valid
      // Sort current combination for consistent output
      const combination = [...current].sort((a, b) => a - b);
      // Check if any excluded numbers are in the combination
      for (const num of exclude) {
        if (combination.includes(num)) {
          return; // Invalid because it contains an excluded number
        }
      }
      result.push(combination);
    }
    return;
  }
  
  // Pruning: if remaining sum is too small or too large
  const minPossible = sumOfSmallest(remainingSize, start);
  const maxPossible = sumOfLargest(remainingSize);
  
  if (remainingSum < minPossible || remainingSum > maxPossible) {
    return;
  }
  
  // Try each possible digit
  for (let digit = start; digit <= 9; digit++) {
    // Skip if digit is excluded
    if (exclude && exclude.includes(digit)) {
      continue;
    }
    
    // Skip if digit is already used in current combination
    if (current.includes(digit)) {
      continue;
    }
    
    // For the remaining positions, use digits from digit+1 to 9
    // This ensures combinations are in ascending order and no repeats
    current.push(digit);
    findCombinations(
      remainingSum - digit,
      remainingSize - 1,
      exclude,
      digit + 1, // Next digit must be greater than current (no repeats in sorted order)
      current,
      result
    );
    current.pop();
  }
}

function sumOfSmallest(count, start) {
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += start + i;
  }
  return sum;
}

function sumOfLargest(count) {
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += 9 - i;
  }
  return sum;
}