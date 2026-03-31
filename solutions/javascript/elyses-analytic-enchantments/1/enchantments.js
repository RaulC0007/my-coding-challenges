/**
 * Finds the position (index) of a specific card in the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} card The card to find the position of.
 * @returns {number} The 0-based index of the card, or -1 if not found.
 */
export function getCardPosition(stack, card) {
  return stack.indexOf(card);
}

/**
 * Determines if a specific card is present in the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} card The card to check for presence.
 * @returns {boolean} True if the card is in the stack, false otherwise.
 */
export function doesStackIncludeCard(stack, card) {
  return stack.includes(card);
}

/**
 * Determines if every card in the stack is an even number.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {boolean} True if all cards are even, false otherwise.
 */
export function isEachCardEven(stack) {
  return stack.every(num => num % 2 === 0);
}

/**
 * Checks if at least one card in the stack has an odd value.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {boolean} True if there's at least one odd card, false otherwise.
 */
export function doesStackIncludeOddCard(stack) {
  return stack.some(num => num % 2 !== 0);
}

/**
 * Gets the value of the first odd card from the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {number | undefined} The value of the first odd card, or undefined if no odd card is found.
 */
export function getFirstOddCard(stack) {
  return stack.find(num => num % 2 !== 0);
}

/**
 * Determines the position (index) of the first card that is an even number.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {number} The 0-based index of the first even card, or -1 if no even card is found.
 */
export function getFirstEvenCardPosition(stack) {
  return stack.findIndex(num => num % 2 === 0);
}