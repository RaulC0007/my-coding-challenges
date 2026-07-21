const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const REVERSED_ALPHABET = 'zyxwvutsrqponmlkjihgfedcba';

const normalizeInput = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const formatOutput = (text) => {
  const groups = [];
  for (let i = 0; i < text.length; i += 5) {
    groups.push(text.slice(i, i + 5));
  }
  return groups.join(' ');
};

const atbashChar = (char) => {
  if (char >= '0' && char <= '9') {
    return char;
  }
  const index = ALPHABET.indexOf(char);
  return REVERSED_ALPHABET[index];
};

export const encode = (phrase) => {
  const normalized = normalizeInput(phrase);
  let result = '';
  
  for (const char of normalized) {
    result += atbashChar(char);
  }
  
  return formatOutput(result);
};

export const decode = (phrase) => {
  const normalized = normalizeInput(phrase);
  let result = '';
  
  for (const char of normalized) {
    result += atbashChar(char);
  }
  
  return result;
};
