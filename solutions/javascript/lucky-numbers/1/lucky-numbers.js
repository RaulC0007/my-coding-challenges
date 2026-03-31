/**
 * Calculates the sum of two numbers represented by arrays of digits.
 *
 * @param {number[]} array1 The first array of digits (0-9).
 * @param {number[]} array2 The second array of digits (0-9).
 * @returns {number} The sum of the two numbers.
 */
export function twoSum(array1, array2) {
  const num1 = Number(array1.join(''));
  const num2 = Number(array2.join(''));
  return num1 + num2;
}

/**
 * Determines if a given positive integer is a palindrome.
 *
 * @param {number} number The positive integer to check.
 * @returns {boolean} True if the number is a palindrome, false otherwise.
 */
export function luckyNumber(number) {
  const numString = String(number);
  const reversedString = numString.split('').reverse().join('');
  return numString === reversedString;
}

/**
 * Generates an error message for invalid user input based on specific rules.
 *
 * @param {string | null | undefined} input The user input.
 * @returns {string} The appropriate error message or an empty string for valid input.
 */
export function errorMessage(input) {
  // Check for no input (null, undefined, or empty string)
  if (!input) { // input will be falsy if it's '', null, or undefined
    return 'Required field';
  }

  const numValue = Number(input);

  // Check if conversion resulted in NaN OR if the number is 0
  if (isNaN(numValue) || numValue === 0) {
    return 'Must be a number besides 0';
  }

  // Otherwise, the input is valid
  return '';
}