export function solve(puzzle: string): Record<string, number> | undefined {
  // Parse the puzzle: split into left side and right side
  const [left, right] = puzzle.split(' == ');
  const leftWords = left.split(' + ');
  const rightWord = right;
  
  // Extract all unique letters from the puzzle
  const allLetters = new Set<string>();
  leftWords.forEach(word => word.split('').forEach(char => allLetters.add(char)));
  rightWord.split('').forEach(char => allLetters.add(char));
  const letters = Array.from(allLetters);
  
  // Identify leading letters (cannot be zero)
  const leadingLetters = new Set<string>();
  leftWords.forEach(word => leadingLetters.add(word[0]));
  leadingLetters.add(rightWord[0]);
  
  // Helper function to convert word to number using current mapping
  function wordToNumber(word: string, mapping: Map<string, number>): number {
    let num = 0;
    for (const char of word) {
      num = num * 10 + mapping.get(char)!;
    }
    return num;
  }
  
  // Helper function to check if current mapping is valid
  function isValid(mapping: Map<string, number>): boolean {
    // Check leading digits are not zero
    for (const letter of leadingLetters) {
      if (mapping.get(letter) === 0) {
        return false;
      }
    }
    
    // Calculate sum of left side
    let sum = 0;
    for (const word of leftWords) {
      sum += wordToNumber(word, mapping);
    }
    
    // Calculate right side
    const result = wordToNumber(rightWord, mapping);
    
    return sum === result;
  }
  
  // Generate all permutations of digits for the letters
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const usedDigits = new Set<number>();
  const mapping = new Map<string, number>();
  
  function backtrack(index: number): boolean {
    if (index === letters.length) {
      return isValid(mapping);
    }
    
    const letter = letters[index];
    for (const digit of digits) {
      if (usedDigits.has(digit)) continue;
      if (digit === 0 && leadingLetters.has(letter)) continue;
      
      usedDigits.add(digit);
      mapping.set(letter, digit);
      
      if (backtrack(index + 1)) {
        return true;
      }
      
      usedDigits.delete(digit);
      mapping.delete(letter);
    }
    
    return false;
  }
  
  if (backtrack(0)) {
    const result: Record<string, number> = {};
    for (const [letter, digit] of mapping) {
      result[letter] = digit;
    }
    return result;
  }
  
  return undefined;
}