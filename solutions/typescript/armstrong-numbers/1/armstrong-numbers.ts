/**
 * Determina si un número dado es un Número de Armstrong.
 * * @param number El número entero (ingresa como BigInt o number) a evaluar.
 * @returns true si cumple la condición de Armstrong, de lo contrario false.
 */
export function isArmstrongNumber(number: number | bigint): boolean {
  // Convertimos a string para mapear los dígitos y obtener la potencia fácilmente
  const numberStr = number.toString();
  const numDigits = numberStr.length;

  // Usamos BigInt para el acumulador si el número de entrada es BigInt, 
  // previniendo desbordamientos de memoria en números gigantescos
  let sum: bigint | number = typeof number === 'bigint' ? 0n : 0;

  for (const digitChar of numberStr) {
    const digit = parseInt(digitChar, 10);

    if (typeof number === 'bigint') {
      // Operaciones nativas en BigInt
      (sum as bigint) += BigInt(digit) ** BigInt(numDigits);
    } else {
      // Operaciones estándar para tipo number
      (sum as number) += digit ** numDigits;
    }
  }

  // Comparamos el acumulado final con el valor original
  return sum === number;
}