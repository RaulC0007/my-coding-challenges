export function squareRoot(radicand: number): number {
  if (radicand === 0 || radicand === 1) {
    return radicand;
  }
  
  let left = 1;
  let right = radicand;
  let result = 0;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    
    if (square === radicand) {
      return mid;
    } else if (square < radicand) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}