// @ts-check

/**
 * Generates a random starship registry number.
 * Registry numbers start with "NCC-" and then use a number from 1000 to 9999 (both inclusive).
 *
 * @returns {string} The generated registry number (e.g., "NCC-1947").
 */
export function randomShipRegistryNumber() {
  // Math.random() returns a float between 0 (inclusive) and 1 (exclusive).
  // To get a number in a range [min, max] (inclusive of both), use:
  // Math.floor(Math.random() * (max - min + 1)) + min;
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return `NCC-${randomNumber}`;
}

/**
 * Generates a random stardate.
 * A stardate is a floating point number between 41000.0 (inclusive) and 42000.0 (exclusive).
 *
 * @returns {number} A stardate (e.g., 41458.15721310934).
 */
export function randomStardate() {
  // To get a number in a range [min, max) (inclusive of min, exclusive of max), use:
  // Math.random() * (max - min) + min;
  const minStardate = 41000.0;
  const maxStardate = 42000.0; // Exclusive
  return Math.random() * (maxStardate - minStardate) + minStardate;
}

/**
 * Generates a random planet class.
 * Possible planetary classes are: D, H, J, K, L, M, N, R, T, and Y.
 *
 * @returns {string} A one-letter planet class (e.g., "K").
 */
export function randomPlanetClass() {
  const planetClasses = ['D', 'H', 'J', 'K', 'L', 'M', 'N', 'R', 'T', 'Y'];

  // To pick a random element from an array, generate a random index:
  // Math.floor(Math.random() * array.length);
  const randomIndex = Math.floor(Math.random() * planetClasses.length);

  return planetClasses[randomIndex];
}