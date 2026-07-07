export const encode = (str) => {
  if (!str || typeof str !== 'string') return '';

  let result = '';
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i < str.length - 1 && str[i] === str[i + 1]) {
      count++;
    } else {
      if (count > 1) {
        result += count + str[i];
      } else {
        result += str[i];
      }
      count = 1;
    }
  }
  return result;
};

export const decode = (encodedStr) => {
  if (!encodedStr || typeof encodedStr !== 'string') return '';

  let result = '';
  let count = '';

  for (let i = 0; i < encodedStr.length; i++) {
    const char = encodedStr[i];
    if (char >= '0' && char <= '9') {
      count += char;
    } else {
      const num = count || '1';
      const charCount = parseInt(num, 10);
      result += char.repeat(charCount);
      count = '';
    }
  }
  return result;
};
