const M = 26;

const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

const modInverse = (a, m) => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  throw new Error('a and m must be coprime.');
};

const checkKeys = (a) => {
  if (gcd(a, M) !== 1) {
    throw new Error('a and m must be coprime.');
  }
};

const cleanInput = (phrase) => {
  const result = [];
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i].toLowerCase();
    if (/[a-z0-9]/.test(char)) {
      result.push(char);
    }
  }
  return result;
};

const groupBy5 = (chars) => {
  const groups = [];
  for (let i = 0; i < chars.length; i += 5) {
    groups.push(chars.slice(i, i + 5).join(''));
  }
  return groups.join(' ');
};

export const encode = (phrase, key) => {
  const { a, b } = key;
  checkKeys(a);

  const chars = cleanInput(phrase);
  const encoded = chars.map((char) => {
    if (/[0-9]/.test(char)) {
      return char;
    }
    const i = char.charCodeAt(0) - 97;
    const e = (a * i + b) % M;
    return String.fromCharCode(e + 97);
  });

  return groupBy5(encoded);
};

export const decode = (phrase, key) => {
  const { a, b } = key;
  checkKeys(a);

  const aInverse = modInverse(a, M);
  const chars = cleanInput(phrase);

  const decoded = chars.map((char) => {
    if (/[0-9]/.test(char)) {
      return char;
    }
    const y = char.charCodeAt(0) - 97;
    const d = (aInverse * (y - b + M * M)) % M;
    return String.fromCharCode(d + 97);
  });

  return decoded.join('');
};

