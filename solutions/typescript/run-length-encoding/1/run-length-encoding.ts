/**
 * Codifica una cadena de texto utilizando el algoritmo Run-Length Encoding (RLE).
 * @param input Cadena de texto original sin números.
 * @returns Cadena comprimida con formato RLE.
 */
export function encode(input: string): string {
  let encoded = '';
  let count = 1;

  for (let i = 0; i < input.length; i++) {
    // Si el siguiente carácter es igual al actual, incrementamos la racha
    if (input[i] === input[i + 1]) {
      count++;
    } else {
      // Si la racha terminó o es el último elemento, construimos el fragmento.
      // Si count es 1, omitimos el número según las instrucciones.
      encoded += (count > 1 ? count : '') + input[i];
      count = 1; // Reiniciamos el contador para el siguiente bloque de caracteres
    }
  }

  return encoded;
}

/**
 * Decodifica una cadena previamente comprimida con Run-Length Encoding (RLE).
 * @param input Cadena comprimida con formato RLE.
 * @returns Cadena de texto original perfectamente reconstruida.
 */
export function decode(input: string): string {
  // Expresión regular: 
  // (\d*) captura un grupo opcional de dígitos numéricos
  // (.) captura exactamente un carácter individual posterior (incluyendo espacios)
  const regex = /(\d*)(.)/g;
  
  return input.replace(regex, (_, countStr, char) => {
    // Si countStr está vacío, significa que el carácter apareció una sola vez
    const count = countStr ? parseInt(countStr, 10) : 1;
    return char.repeat(count);
  });
}