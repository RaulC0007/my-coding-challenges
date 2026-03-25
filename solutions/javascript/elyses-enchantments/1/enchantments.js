/**
 * Retrieves a card from a stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} position The position (index) of the card to retrieve.
 * @returns {number} The card at the given position.
 */
export function getItem(stack, position) {
  return stack[position];
}

/**
 * Exchanges a card in the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} position The position (index) of the card to exchange.
 * @param {number} replacementCard The new card to place at the position.
 * @returns {number[]} The adjusted stack.
 */
export function setItem(stack, position, replacementCard) {
  stack[position] = replacementCard;
  return stack;
}

/**
 * Inserts a new card at the top (end) of the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} newCard The new card to insert.
 * @returns {number[]} The adjusted stack.
 */
export function insertItemAtTop(stack, newCard) {
  stack.push(newCard);
  return stack;
}

/**
 * Removes a card from the stack at a specific position.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} position The position (index) of the card to remove.
 * @returns {number[]} The adjusted stack.
 */
export function removeItem(stack, position) {
  stack.splice(position, 1);
  return stack;
}

/**
 * Removes the top (last) card from the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {number[]} The adjusted stack.
 */
export function removeItemFromTop(stack) {
  stack.pop();
  return stack;
}

/**
 * Inserts a new card at the bottom (beginning) of the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} newCard The new card to insert.
 * @returns {number[]} The adjusted stack.
 */
export function insertItemAtBottom(stack, newCard) {
  stack.unshift(newCard);
  return stack;
}

/**
 * Removes the bottom (first) card from the stack.
 *
 * @param {number[]} stack The stack of cards.
 * @returns {number[]} The adjusted stack.
 */
export function removeItemAtBottom(stack) {
  stack.shift();
  return stack;
}

/**
 * Checks if the size of the stack is equal to a given size.
 *
 * @param {number[]} stack The stack of cards.
 * @param {number} stackSize The size to check against.
 * @returns {boolean} True if the stack size matches, false otherwise.
 */
export function checkSizeOfStack(stack, stackSize) {
  return stack.length === stackSize;
}