export function answer(question) {
  // 1. Validar la estructura mínima del enunciado
  if (!question.startsWith('What is') || !question.endsWith('?')) {
    throw new Error('Unknown operation');
  }

  // 2. Extraer el cuerpo interno limpiando los prefijos y sufijos
  let cleaned = question;
  if (question.startsWith('What is ')) {
    cleaned = question.substring(8, question.length - 1).trim();
  } else {
    cleaned = question.substring(7, question.length - 1).trim();
  }

  // Si se envió algo como "What is?" el contenido limpio quedará vacío
  if (cleaned === '') {
    throw new Error('Syntax error');
  }

  // 3. Normalizar frases de múltiples palabras a términos simples individuales
  cleaned = cleaned.replace(/multiplied by/gi, 'multiplied');
  cleaned = cleaned.replace(/divided by/gi, 'divided');

  // Dividir el cuerpo en un arreglo de palabras independientes usando espacios
  const tokens = cleaned.split(/\s+/);

  const validOps = ['plus', 'minus', 'multiplied', 'divided'];
  
  // 4. Comprobación temprana de Semántica: Buscar palabras completamente inválidas
  for (const token of tokens) {
    if (isNaN(Number(token)) && !validOps.includes(token.toLowerCase())) {
      throw new Error('Unknown operation');
    }
  }

  // 5. Evaluación secuencial de Izquierda a Derecha sin precedencia matemática
  let result = Number(tokens[0]);
  if (isNaN(result)) {
    throw new Error('Syntax error');
  }

  let i = 1;
  while (i < tokens.length) {
    const op = tokens[i].toLowerCase();
    
    // Si la posición reservada para la operación no contiene un operador válido
    if (!validOps.includes(op)) {
      throw new Error('Syntax error');
    }

    // Si el operador es el último elemento y falta el número de cierre
    if (i + 1 >= tokens.length) {
      throw new Error('Syntax error');
    }
    
    const nextValue = Number(tokens[i + 1]);
    if (isNaN(nextValue)) {
      throw new Error('Syntax error');
    }

    // Ejecutar el cálculo correspondiente
    switch (op) {
      case 'plus':
        result += nextValue;
        break;
      case 'minus':
        result -= nextValue;
        break;
      case 'multiplied':
        result *= nextValue;
        break;
      case 'divided':
        result /= nextValue;
        break;
      default:
        throw new Error('Syntax error');
    }

    // Avanzamos de a dos posiciones: (operador + operando)
    i += 2;
  }

  // 6. Comprobación final: El puntero de lectura 'i' debe haber procesado exactamente todos los tokens
  if (i !== tokens.length) {
    throw new Error('Syntax error');
  }

  return result;
}