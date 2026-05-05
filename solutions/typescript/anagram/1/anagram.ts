export class Anagram {
  private target: string;
  private targetLower: string;
  private targetSorted: string;

  constructor(input: string) {
    this.target = input;
    this.targetLower = input.toLowerCase();
    this.targetSorted = this.sortString(this.targetLower);
  }

  private sortString(str: string): string {
    return str.split('').sort().join('');
  }

  public matches(...potentials: string[]): string[] {
    const results: string[] = [];
    
    for (const candidate of potentials) {
      // Skip if the candidate is the exact same word (case-sensitive)
      if (candidate === this.target) {
        continue;
      }
      
      const candidateLower = candidate.toLowerCase();
      
      // Skip if lengths don't match
      if (candidateLower.length !== this.targetLower.length) {
        continue;
      }
      
      // Skip if it's the same word (case-insensitive)
      if (candidateLower === this.targetLower) {
        continue;
      }
      
      // Check if sorted strings match
      if (this.sortString(candidateLower) === this.targetSorted) {
        results.push(candidate);
      }
    }
    
    return results;
  }
}