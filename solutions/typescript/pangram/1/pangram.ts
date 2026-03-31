export function isPangram(sentence: string): boolean {
  // Convert the sentence to lowercase to make it case-insensitive
  const lowerSentence = sentence.toLowerCase();
  
  // Create a set of all letters in the alphabet
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
  // Check if every letter in the alphabet is present in the sentence
  for (const letter of alphabet) {
    if (!lowerSentence.includes(letter)) {
      return false;
    }
  }
  
  return true;
}