/**
 * Determina cuál es el enésimo (nth) número primo.
 * @param n - La posición del número primo deseado (en base 1).
 * @returns El número primo en la posición n.
 */
export function nth(n: number): number {
  // 1. Validación de entrada conforme a las reglas matemáticas de la suite
  if (n < 1) {
    throw new Error('Prime is not possible');
  }

  // 2. Inicializamos con el primer número primo
  const primes: number[] = [2];
  let candidate = 3;

  // 3. Iteramos hasta alcanzar el tamaño n solicitado
  while (primes.length < n) {
    if (isPrime(candidate, primes)) {
      primes.push(candidate);
    }
    // Saltamos de 2 en 2 para evaluar únicamente números impares
    candidate += 2;
  }

  // 4. Retornamos el último primo de nuestra lista acumulada
  return primes[primes.length - 1];
}

/**
 * Función auxiliar que comprueba si un número es primo basándose
 * en los primos previamente descubiertos hasta su raíz cuadrada.
 */
function isPrime(candidate: number, foundPrimes: number[]): boolean {
  // Un número compuesto siempre tiene un factor primo menor o igual a su raíz cuadrada
  const limit = Math.sqrt(candidate);

  for (const prime of foundPrimes) {
    if (prime > limit) {
      break;
    }
    if (candidate % prime === 0) {
      return false; // Se descubrió un divisor exacto, no es primo
    }
  }

  return true; // Es primo
}