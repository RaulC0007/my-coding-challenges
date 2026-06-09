export class DiffieHellman {
  private p: bigint;
  private g: bigint;

  constructor(p: number, g: number) {
    // 1. Validar que los argumentos sean números válidos y primos
    if (p <= 1 || g <= 1) {
      throw new Error('Arguments must be greater than 1');
    }
    if (!this.isPrime(p) || !this.isPrime(g)) {
      throw new Error('Arguments must be prime numbers');
    }

    this.p = BigInt(p);
    this.g = BigInt(g);
  }

  /**
   * Genera la clave pública a partir de una clave privada.
   * A = (g^privateKey) mod p
   */
  public getPublicKey(privateKey: number): number {
    const priv = BigInt(privateKey);
    
    // Validación de rangos para la clave privada: debe ser > 1 y < p
    if (priv <= 1n || priv >= this.p) {
      throw new Error('Private key must be greater than 1 and less than p');
    }

    const publicKey = this.modPow(this.g, priv, this.p);
    return Number(publicKey);
  }

  /**
   * Calcula el secreto compartido combinando una clave pública ajena con la clave privada propia.
   * s = (theirPublicKey^myPrivateKey) mod p
   */
  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    const pub = BigInt(theirPublicKey);
    const priv = BigInt(myPrivateKey);

    const secret = this.modPow(pub, priv, this.p);
    return Number(secret);
  }

  /**
   * Algoritmo de Exponenciación Modular Eficiente (Square-and-Multiply)
   * Calcula de forma segura (base^exponent) % modulus usando BigInt
   */
  private modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === 1n) return 0n;
    
    let result = 1n;
    let b = base % modulus;
    let e = exponent;

    while (e > 0n) {
      if (e % 2n === 1n) {
        result = (result * b) % modulus;
      }
      e = e / 2n;
      b = (b * b) % modulus;
    }

    return result;
  }

  /**
   * Helper básico para verificar si un número es primo
   */
  private isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }
}