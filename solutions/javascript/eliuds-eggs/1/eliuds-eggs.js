//
// This is only a SKELETON file for the 'Eliud's Eggs' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue) => {
  let count = 0;
  let num = displayValue;
  
  // Mientras el número sea mayor que 0
  while (num > 0) {
    // Si el número es impar, significa que el bit menos significativo es 1
    if (num % 2 === 1) {
      count++;
    }
    // Dividimos entre 2 y redondeamos hacia abajo para "desplazar" el binario
    num = Math.floor(num / 2);
  }
  
  return count;
};