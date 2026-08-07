//
// This is only a SKELETON file for the 'Error handling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const processString = (input) => {
  try {
    // 1. Verificar si el input es una cadena de texto
    if (typeof input !== 'string') {
      throw new TypeError('Input must be a string');
    }

    // 2. Verificar si la cadena está vacía
    if (input.length === 0) {
      return null;
    }

    // 3. Verificar la longitud de la cadena (debe estar entre 10 y 100)
    if (input.length < 10 || input.length > 100) {
      throw new RangeError('Input length must be between 10 and 100 characters');
    }

    // 4. Verificar si contiene una mezcla de letras y números
    const hasLetters = /[a-zA-Z]/.test(input);
    const hasNumbers = /[0-9]/.test(input);
    
    if (hasLetters && hasNumbers) {
      throw new SyntaxError('Input cannot contain a mix of letters and numbers');
    }

    // 5. Si todo es válido, devolver la cadena en mayúsculas
    return input.toUpperCase();

  } catch (error) {
    // 6. Manejo de errores: registrar el mensaje y relanzar el error
    console.log(error.message);
    throw error;
  }
};