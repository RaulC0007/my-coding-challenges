const isPrime = (candidate, knownPrimes) => {
  for (let i = 0; i < knownPrimes.length; i++) {
    const p = knownPrimes[i];
    if (p * p > candidate) break;
    if (candidate % p === 0) return false;
  }
  return true;
};

export const prime = (n) => {
  if (n < 1) {
    throw new Error('there is no zeroth prime');
  }

  const primes = [2];
  let candidate = 3;

  while (primes.length < n) {
    if (isPrime(candidate, primes)) {
      primes.push(candidate);
    }
    candidate += 2;
  }

  return primes[n - 1];
};
