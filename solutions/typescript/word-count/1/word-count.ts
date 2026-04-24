export function count(sentence: string): Map<string, number> {
  const wordCounts = new Map<string, number>();
  
  // Convert to lowercase and split into words
  // Words are separated by spaces, punctuation, or whitespace
  // Apostrophes within words are preserved (contractions)
  
  let currentWord = '';
  
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    const lowerChar = char.toLowerCase();
    
    // Check if character is a letter, number, or apostrophe
    if ((lowerChar >= 'a' && lowerChar <= 'z') || 
        (char >= '0' && char <= '9') || 
        char === "'") {
      currentWord += lowerChar;
    } 
    // If we encounter a delimiter (space, punctuation, etc.)
    else if (currentWord.length > 0) {
      // Remove leading/trailing apostrophes (contractions like 'em)
      let finalWord = currentWord;
      if (finalWord.startsWith("'")) {
        finalWord = finalWord.slice(1);
      }
      if (finalWord.endsWith("'")) {
        finalWord = finalWord.slice(0, -1);
      }
      
      // Only add non-empty words
      if (finalWord.length > 0) {
        wordCounts.set(finalWord, (wordCounts.get(finalWord) || 0) + 1);
      }
      currentWord = '';
    }
  }
  
  // Don't forget the last word
  if (currentWord.length > 0) {
    let finalWord = currentWord;
    if (finalWord.startsWith("'")) {
      finalWord = finalWord.slice(1);
    }
    if (finalWord.endsWith("'")) {
      finalWord = finalWord.slice(0, -1);
    }
    if (finalWord.length > 0) {
      wordCounts.set(finalWord, (wordCounts.get(finalWord) || 0) + 1);
    }
  }
  
  return wordCounts;
}