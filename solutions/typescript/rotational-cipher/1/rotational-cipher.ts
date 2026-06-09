export function rotate(text: string, key: number): string {
  const normalizedKey = key % 26;
  
  if (normalizedKey === 0) {
    return text;
  }
  
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char >= 'a' && char <= 'z') {
      // Shift lowercase letter
      const shiftedCode = ((char.charCodeAt(0) - 97 + normalizedKey) % 26) + 97;
      result += String.fromCharCode(shiftedCode);
    } else if (char >= 'A' && char <= 'Z') {
      // Shift uppercase letter
      const shiftedCode = ((char.charCodeAt(0) - 65 + normalizedKey) % 26) + 65;
      result += String.fromCharCode(shiftedCode);
    } else {
      // Non-alphabetic characters remain unchanged
      result += char;
    }
  }
  
  return result;
}