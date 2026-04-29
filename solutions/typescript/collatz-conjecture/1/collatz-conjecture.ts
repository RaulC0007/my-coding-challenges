export function steps(count: number): number {
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error('Only positive integers are allowed');
  }
  
  if (count === 1) {
    return 0;
  }
  
  let stepsCount = 0;
  let n = count;
  
  while (n > 1) {
    n = n % 2 === 0 ? n / 2 : n * 3 + 1;
    stepsCount++;
  }
  
  return stepsCount;
}