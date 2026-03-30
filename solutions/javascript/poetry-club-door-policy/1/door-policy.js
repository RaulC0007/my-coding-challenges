/**
 * Returns the first character of a given string.
 *
 * @param {string} line The line of the poem.
 * @returns {string} The first letter of the line.
 */
export function frontDoorResponse(line) {
  return line[0];
}

/**
 * Capitalizes a word.
 *
 * @param {string} word The word to capitalize.
 * @returns {string} The capitalized word.
 */
export function frontDoorPassword(word) {
  const firstLetter = word[0].toUpperCase();
  const restOfWord = word.slice(1).toLowerCase();
  return firstLetter + restOfWord;
}

/**
 * Returns the last non-whitespace character of a given string.
 *
 * @param {string} line The line of the poem.
 * @returns {string} The last non-whitespace character.
 */
export function backDoorResponse(line) {
  const trimmedLine = line.trim();
  return trimmedLine[trimmedLine.length - 1];
}

/**
 * Capitalizes a word and adds ", please" at the end.
 *
 * @param {string} word The word to make polite.
 * @returns {string} The polite, capitalized word.
 */
export function backDoorPassword(word) {
  // Call frontDoorPassword directly as it's in the same file
  const capitalizedWord = frontDoorPassword(word);
  return capitalizedWord + ', please';
}