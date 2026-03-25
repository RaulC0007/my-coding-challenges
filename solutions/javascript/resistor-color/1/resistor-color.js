// @ts-check

// Define the COLORS array first, as it's a constant and will be used by colorCode.
// The order of colors in this array corresponds to their numerical value (index).
export const COLORS = [
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
 * Returns the numerical value associated with a given resistor color band.
 *
 * @param {string} color The color name (lowercase).
 * @returns {number} The numerical value for the color.
 * @throws {Error} If the color is not found in the COLORS list.
 */
export const colorCode = (color) => {
  const index = COLORS.indexOf(color);

  if (index === -1) {
    // If the color is not found in the array, it's an invalid input.
    // Throw an error, although the exercise description doesn't explicitly require it,
    // it's good practice for invalid inputs.
    throw new Error(`Invalid color: ${color}. Color not found in the resistor color code.`);
  }

  return index;
};