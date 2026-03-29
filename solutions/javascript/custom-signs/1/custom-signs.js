// @ts-check

/**
 * Builds a sign that includes both the occasion and the name.
 * Uses template strings for easy embedding of variables.
 *
 * @param {string} occasion The occasion for the sign (e.g., 'Birthday').
 * @param {string} name The name to include on the sign.
 * @returns {string} The formatted sign message.
 */
export function buildSign(occasion, name) {
  // Use backticks (``) for template strings and ${} for embedding variables.
  return `Happy ${occasion} ${name}!`;
}

/**
 * Builds a birthday sign that conditionally formats the return string based on age.
 * Uses a ternary operator within the template string.
 *
 * @param {number} age The age of the person.
 * @returns {string} The formatted birthday sign message.
 */
export function buildBirthdaySign(age) {
  // Determine if the person is 'mature' or 'young' using a ternary operator.
  const ageCategory = age >= 50 ? 'mature' : 'young';
  return `Happy Birthday! What a ${ageCategory} fellow you are.`;
}

/**
 * Builds a graduation sign that includes multiple lines.
 * Uses a newline character (`\n`) within the template string.
 *
 * @param {string} name The name of the graduate.
 * @param {number} year The graduation year.
 * @returns {string} The multi-line graduation sign message.
 */
export function graduationFor(name, year) {
  // Template strings naturally support multi-line text, or you can use \n.
  return `Congratulations ${name}!\nClass of ${year}`;
}

/**
 * Computes the cost of a sign based on its content and currency.
 * The sign has a base price and an additional cost per character (including whitespace).
 * The final cost is formatted to two decimal places.
 *
 * @param {string} sign The content of the sign.
 * @param {string} currency The currency symbol or name.
 * @returns {string} The cost to create the sign, formatted with two decimal places and currency.
 */
export function costOf(sign, currency) {
  const basePrice = 20;
  const costPerCharacter = 2;
  // The length of the string includes all characters, including spaces.
  const totalCost = basePrice + (sign.length * costPerCharacter);

  // Use toFixed(2) to format the number to two decimal places.
  // Then embed it into the template string with the currency.
  return `Your sign costs ${totalCost.toFixed(2)} ${currency}.`;
}
