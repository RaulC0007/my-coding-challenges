export const squareRoot = (n) => {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  
  if (n === 0 || n === 1) {
    return n;
  }
  
  // Using Newton's method (Heron's method)
  let guess = n / 2;
  let previousGuess;
  
  do {
    previousGuess = guess;
    // Newton's method: guess = (guess + n/guess) / 2
    guess = (guess + n / guess) / 2;
  } while (Math.abs(guess - previousGuess) > 1e-10);
  
  return Math.floor(guess);
};