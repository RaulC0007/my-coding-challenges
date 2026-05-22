export function encode(plainText: string): string {
  // Process the text
  let result = '';
  let charCount = 0;
  
  for (const char of plainText.toLowerCase()) {
    // Skip non-alphanumeric characters
    if (!/[a-z0-9]/.test(char)) {
      continue;
    }
    
    // Add space before adding a new character if we already have 5 characters
    if (charCount === 5) {
      result += ' ';
      charCount = 0;
    }
    
    // Transform the character
    if (/[a-z]/.test(char)) {
      // Atbash transformation: a<->z, b<->y, etc.
      const code = char.charCodeAt(0);
      const transformedCode = 219 - code; // 'a' (97) + 'z' (122) = 219
      result += String.fromCharCode(transformedCode);
    } else {
      // Numbers remain unchanged
      result += char;
    }
    
    charCount++;
  }
  
  return result;
}

export function decode(cipherText: string): string {
  let result = '';
  
  for (const char of cipherText) {
    // Skip spaces
    if (char === ' ') {
      continue;
    }
    
    // Transform the character
    if (/[a-z]/.test(char)) {
      const code = char.charCodeAt(0);
      const transformedCode = 219 - code; // Same transformation as encode
      result += String.fromCharCode(transformedCode);
    } else {
      // Numbers remain unchanged
      result += char;
    }
  }
  
  return result;
}