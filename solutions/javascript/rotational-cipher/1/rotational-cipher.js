export const rotate = (text, key) => {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = text.charCodeAt(i);

    if (code >= 65 && code <= 90) {
      // Uppercase A-Z
      result += String.fromCharCode(((code - 65 + key) % 26) + 65);
    } else if (code >= 97 && code <= 122) {
      // Lowercase a-z
      result += String.fromCharCode(((code - 97 + key) % 26) + 97);
    } else {
      // Non-alphabetic characters pass through unchanged
      result += char;
    }
  }

  return result;
};
