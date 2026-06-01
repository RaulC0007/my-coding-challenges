export function flatten(arr: any[]): any[] {
  const result: any[] = [];
  
  for (const item of arr) {
    if (Array.isArray(item)) {
      // Recursively flatten nested arrays and concatenate
      result.push(...flatten(item));
    } else if (item !== null && item !== undefined) {
      // Add non-null, non-undefined values
      result.push(item);
    }
    // Skip null and undefined
  }
  
  return result;
}