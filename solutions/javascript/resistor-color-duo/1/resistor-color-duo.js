// @ts-check

// Re-using the COLORS mapping from the previous exercise.
// This array maps color names (by index) to their numerical values.
const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
];

/**
 * Decodes the first two color bands of a resistor into a two-digit number.
 *
 * @param {string[]} colors An array of color names.
 * @returns {number} The two-digit resistance value.
 */
export const decodedValue = (colors) => {
  // Get the numerical value of the first color band.
  // We assume the color exists in our COLORS array.
  const firstDigit = COLORS.indexOf(colors[0]);

  // Get the numerical value of the second color band.
  const secondDigit = COLORS.indexOf(colors[1]);

  // Combine them to form a two-digit number.
  // For example, if firstDigit is 1 and secondDigit is 5,
  // 1 * 10 + 5 will result in 15.
  return firstDigit * 10 + secondDigit;
};