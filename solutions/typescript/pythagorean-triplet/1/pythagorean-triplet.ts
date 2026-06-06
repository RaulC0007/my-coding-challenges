type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({ minFactor = 1, maxFactor, sum }: Options): Triplet[] {
  const results: Triplet[] = [];
  
  // If maxFactor is not provided, calculate a reasonable upper bound
  // Since a < b < c and a + b + c = sum, the maximum possible value for a is sum/3
  const maxA = Math.floor(sum / 3);
  
  // Determine the search range
  const startA = Math.max(minFactor, 1);
  const endA = maxFactor ? Math.min(maxFactor, maxA) : maxA;
  
  for (let a = startA; a <= endA; a++) {
    // For a given a, b must be greater than a and less than (sum - a)/2
    const maxB = Math.floor((sum - a) / 2);
    const startB = a + 1;
    const endB = maxFactor ? Math.min(maxFactor, maxB) : maxB;
    
    for (let b = startB; b <= endB; b++) {
      // Calculate c from the sum constraint
      const c = sum - a - b;
      
      // Check if c satisfies the triplet conditions
      if (c <= b) continue; // c must be greater than b
      if (maxFactor && c > maxFactor) continue; // Check maxFactor constraint
      
      // Check Pythagorean theorem
      if (a * a + b * b === c * c) {
        results.push(new Triplet(a, b, c));
      }
    }
  }
  
  return results;
}

class Triplet {
  private a: number;
  private b: number;
  private c: number;
  
  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
  
  toArray(): [number, number, number] {
    return [this.a, this.b, this.c];
  }
}