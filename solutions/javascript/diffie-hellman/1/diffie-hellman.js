export class DiffieHellman {
  constructor(p, g) {
    if (!this.#isPrime(p) || !this.#isPrime(g)) {
      throw new Error('Both p and g must be prime numbers.');
    }

    this.p = p;
    this.g = g;
  }

  static getPrivateKey(p) {
    return Math.floor(Math.random() * (p - 2)) + 2;
  }

  getPublicKey(privateKey) {
    if (privateKey <= 1 || privateKey >= this.p) {
      throw new Error('Invalid private key.');
    }

    return this.#modPow(this.g, privateKey, this.p);
  }

  getSecret(theirPublicKey, myPrivateKey) {
    if (myPrivateKey <= 1 || myPrivateKey >= this.p) {
      throw new Error('Invalid private key.');
    }

    return this.#modPow(theirPublicKey, myPrivateKey, this.p);
  }

  #modPow(base, exponent, modulus) {
    let result = 1;
    base %= modulus;

    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }

      base = (base * base) % modulus;
      exponent = Math.floor(exponent / 2);
    }

    return result;
  }

  #isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  }
}

