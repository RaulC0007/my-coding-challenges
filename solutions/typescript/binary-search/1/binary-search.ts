export function find<T>(haystack: T[], needle: T): number {
  let left = 0;
  let right = haystack.length - 1;
  
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const middleValue = haystack[middle];
    
    if (middleValue === needle) {
      return middle;
    } else if (middleValue > needle) {
      // Middle value is greater than needle, eliminate right half
      right = middle - 1;
    } else {
      // Middle value is less than needle, eliminate left half
      left = middle + 1;
    }
  }
  
  // Item not found
  throw new Error('Value not in array');
}