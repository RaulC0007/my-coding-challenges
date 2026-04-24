export const answer = (question: string): number => {
  // Check for empty expression first (must come before format validation)
  if (question === 'What is?') {
    throw new Error('Syntax error');
  }
  
  // Validate format
  if (!question.startsWith('What is ') || !question.endsWith('?')) {
    throw new Error('Unknown operation');
  }
  
  // Extract expression
  let expr = question.slice(8, -1).trim();
  
  // Check for empty expression
  if (expr.length === 0) {
    throw new Error('Syntax error');
  }
  
  // Handle single number case
  if (/^-?\d+$/.test(expr)) {
    return parseInt(expr, 10);
  }
  
  // Tokenize and validate
  const tokens = expr.split(' ');
  
  // First token must be a number
  if (tokens.length === 0 || isNaN(Number(tokens[0]))) {
    throw new Error('Syntax error');
  }
  
  // Check for unsupported operations like "cubed"
  const unsupportedOps = ['cubed', 'squared', 'power'];
  for (const token of tokens) {
    if (unsupportedOps.includes(token)) {
      throw new Error('Unknown operation');
    }
  }
  
  let result = Number(tokens[0]);
  let position = 1;
  
  while (position < tokens.length) {
    const op = tokens[position];
    
    // Validate operation syntax
    if (op === 'plus' || op === 'minus') {
      if (position + 1 >= tokens.length) {
        throw new Error('Syntax error');
      }
      const nextNum = Number(tokens[position + 1]);
      if (isNaN(nextNum)) {
        throw new Error('Syntax error');
      }
      
      if (op === 'plus') {
        result += nextNum;
      } else {
        result -= nextNum;
      }
      position += 2;
    } 
    else if (op === 'multiplied') {
      if (position + 2 >= tokens.length || tokens[position + 1] !== 'by') {
        throw new Error('Syntax error');
      }
      const nextNum = Number(tokens[position + 2]);
      if (isNaN(nextNum)) {
        throw new Error('Syntax error');
      }
      result *= nextNum;
      position += 3;
    }
    else if (op === 'divided') {
      if (position + 2 >= tokens.length || tokens[position + 1] !== 'by') {
        throw new Error('Syntax error');
      }
      const nextNum = Number(tokens[position + 2]);
      if (isNaN(nextNum)) {
        throw new Error('Syntax error');
      }
      if (nextNum === 0) {
        throw new Error('Division by zero');
      }
      result /= nextNum;
      position += 3;
    }
    else {
      // Unknown token - check if it looks like a number
      if (!isNaN(Number(op))) {
        throw new Error('Syntax error');
      }
      // For unsupported operations like "cubed", this will be caught earlier
      throw new Error('Unknown operation');
    }
  }
  
  return Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
};