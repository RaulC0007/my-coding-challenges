export const primes = (limit) => {
  if (limit < 2) {
    return [];
  }

  const isMarked = new Array(limit + 1).fill(false);
  const result = [];

  for (let n = 2; n <= limit; n++) {
    if (!isMarked[n]) {
      result.push(n);
      for (let multiple = n * n; multiple <= limit; multiple += n) {
        isMarked[multiple] = true;
      }
    }
  }

  return result;
};

