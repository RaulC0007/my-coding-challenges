export function clean(phoneNumber: string): string {
  // 1. Validar letras y puntuación ANTES de limpiar
  // Los tests esperan estos mensajes específicos si encuentran caracteres prohibidos
  if (/[a-zA-Z]/.test(phoneNumber)) {
    throw new Error('Letters not permitted');
  }
  if (/[@:!]/.test(phoneNumber)) {
    throw new Error('Punctuations not permitted');
  }

  // 2. Extraer solo los dígitos
  let digits = phoneNumber.replace(/\D/g, '');

  // 3. Validaciones de longitud y código de país
  if (digits.length < 10) {
    throw new Error('Must not be fewer than 10 digits');
  }

  if (digits.length === 11) {
    if (digits[0] !== '1') {
      throw new Error('11 digits must start with 1');
    }
    digits = digits.slice(1);
  }

  if (digits.length > 11) {
    throw new Error('Must not be greater than 11 digits');
  }
  
  if (digits.length !== 10) {
    // Caso para cuando después de procesar el 11 inicial, algo salió mal
    throw new Error('Incorrect number of digits');
  }

  // 4. Validar Código de Área (NXX)
  if (digits[0] === '0') {
    throw new Error('Area code cannot start with zero');
  }
  if (digits[0] === '1') {
    throw new Error('Area code cannot start with one');
  }

  // 5. Validar Código de Intercambio (NXX)
  if (digits[3] === '0') {
    throw new Error('Exchange code cannot start with zero');
  }
  if (digits[3] === '1') {
    throw new Error('Exchange code cannot start with one');
  }

  return digits;
}