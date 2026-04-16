export function isLeap(year: number): boolean {
  // A year is a leap year if it's divisible by 4
  // BUT not if it's divisible by 100, unless it's also divisible by 400
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}