export function isIsogram(word: string): boolean {
  // Handle empty input
  if (!word) return true;
  
  // Convert to lowercase for case-insensitive comparison
  const lowerWord = word.toLowerCase();
  
  // Track seen letters
  const seenLetters = new Set<string>();
  
  for (const char of lowerWord) {
    // Ignore spaces and hyphens
    if (char === ' ' || char === '-') {
      continue;
    }
    
    // If we've seen this letter before, it's not an isogram
    if (seenLetters.has(char)) {
      return false;
    }
    
    // Add letter to seen set
    seenLetters.add(char);
  }
  
  return true;
}