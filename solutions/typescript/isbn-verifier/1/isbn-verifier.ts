/**
 * Verifica si una cadena de texto es un ISBN-10 válido.
 * 
 * @param isbn - La cadena que representa el ISBN (puede contener guiones).
 * @returns boolean - true si es válido, false en caso contrario.
 */
export function isValid(isbn: string): boolean {
  // 1. Preprocesamiento: Eliminar guiones
  const cleanIsbn = isbn.replace(/-/g, '');

  // 2. Validación básica de longitud
  if (cleanIsbn.length !== 10) {
    return false;
  }

  // 3. Validación de caracteres permitidos usando una Expresión Regular
  // Debe tener 9 dígitos seguidos de un dígito o una 'X'
  if (!/^\d{9}[\dX]$/.test(cleanIsbn)) {
    return false;
  }

  // 4. Cálculo de la suma ponderada
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const char = cleanIsbn[i];
    let value: number;

    if (char === 'X') {
      value = 10;
    } else {
      value = parseInt(char, 10);
    }

    // El peso decrece de 10 a 1 según la posición (i de 0 a 9)
    const weight = 10 - i;
    sum += value * weight;
  }

  // 5. Comprobar la fórmula: suma mod 11 == 0
  return sum % 11 === 0;
}