interface Input {
  maxFactor: number;
  minFactor?: number;
}

interface PalindromeResult {
  value: number | null;
  factors: [number, number][];
}

interface GenerateReturn {
  smallest: PalindromeResult;
  largest: PalindromeResult;
}

export function generate({ maxFactor, minFactor = 1 }: Input): GenerateReturn {
  if (minFactor > maxFactor) {
    throw new Error('min must be <= max');
  }

  const minProduct = minFactor * minFactor;
  const maxProduct = maxFactor * maxFactor;

  // 1. Determinar cuántos dígitos tienen los productos extremos
  const minDigits = minProduct.toString().length;
  const maxDigits = maxProduct.toString().length;

  const smallest: PalindromeResult = { value: null, factors: [] };
  const largest: PalindromeResult = { value: null, factors: [] };

  // 2. Coleccionar TODOS los palíndromos posibles en ese rango de dígitos matemáticamente
  const palindromes: number[] = [];
  for (let d = minDigits; d <= maxDigits; d++) {
    palindromes.push(...generatePalindromesOfLength(d));
  }

  // Filtrar solo los que caen estrictamente en el rango de productos y ordenarlos
  const validPalindromes = Array.from(new Set(palindromes))
    .filter(p => p >= minProduct && p <= maxProduct)
    .sort((a, b) => a - b);

  // 3. Encontrar el SMALLEST (De menor a mayor)
  for (const p of validPalindromes) {
    const foundFactors = getFactorsInRange(p, minFactor, maxFactor);
    if (foundFactors.length > 0) {
      smallest.value = p;
      smallest.factors = foundFactors;
      break; // Éxito inmediato
    }
  }

  // 4. Encontrar el LARGEST (De mayor a menor)
  for (let i = validPalindromes.length - 1; i >= 0; i--) {
    const p = validPalindromes[i];
    const foundFactors = getFactorsInRange(p, minFactor, maxFactor);
    if (foundFactors.length > 0) {
      largest.value = p;
      largest.factors = foundFactors;
      break; // Éxito inmediato
    }
  }

  return { smallest, largest };
}

/**
 * Genera de forma puramente matemática todos los números palíndromos 
 * que tienen una longitud de dígitos exacta 'len'.
 */
function generatePalindromesOfLength(len: number): number[] {
  const result: number[] = [];
  if (len === 1) return [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const halfLen = Math.ceil(len / 2);
  const start = Math.pow(10, halfLen - 1);
  const end = Math.pow(10, halfLen) - 1;

  for (let i = start; i <= end; i++) {
    const s = i.toString();
    let rev = s.split('').reverse().join('');
    
    let palindromeStr = '';
    if (len % 2 === 0) {
      // Longitud par: duplicamos la raíz entera (ej: "12" -> "12" + "21" = 1221)
      palindromeStr = s + rev;
    } else {
      // Longitud impar: el dígito del medio no se duplica (ej: "12" -> "12" + "1" = 121)
      palindromeStr = s + rev.substring(1);
    }
    result.push(parseInt(palindromeStr, 10));
  }

  return result;
}

/**
 * Obtiene los factores de un número dentro del rango usando raíz cuadrada (O(sqrt(N)))
 */
function getFactorsInRange(p: number, min: number, max: number): [number, number][] {
  const factors: [number, number][] = [];
  const limit = Math.min(max, Math.floor(Math.sqrt(p)));
  
  for (let i = min; i <= limit; i++) {
    if (p % i === 0) {
      const j = p / i;
      if (j >= min && j <= max) {
        factors.push([i, j]);
      }
    }
  }
  return factors;
}