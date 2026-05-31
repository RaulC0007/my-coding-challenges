/**
 * Implementa el algoritmo de la Criba de Eratóstenes para encontrar 
 * todos los números primos menores o iguales a un límite dado.
 * * @param limit El número máximo a evaluar.
 * @returns Un arreglo con todos los números primos encontrados de forma secuencial.
 */
export function primes(limit: number): number[] {
  // 1. Inicializar la criba. Usamos booleanos para saber si un índice es primo (true) o no (false).
  const isPrime: boolean[] = new Array(limit + 1).fill(true);
  
  // 0 y 1 no entran en la categoría de números primos
  isPrime[0] = false;
  isPrime[1] = false;

  const maxCheck = Math.sqrt(limit);

  // 2. Ejecutar el descarte por múltiplos
  for (let p = 2; p <= maxCheck; p++) {
    // Si el número sigue marcado como true, es un primo
    if (isPrime[p]) {
      // Tachamos todos sus múltiplos empezando desde p * p (los anteriores ya fueron tachados)
      for (let multiple = p * p; multiple <= limit; multiple += p) {
        isPrime[multiple] = false;
      }
    }
  }

  // 3. Recolectar todos los índices que lograron quedarse con la marca 'true'
  const primeNumbers: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}