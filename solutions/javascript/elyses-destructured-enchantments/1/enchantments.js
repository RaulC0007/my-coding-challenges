/**
 * Gets the first card from the deck.
 * (No array[index], .at(index), or .shift() allowed)
 *
 * @param {number[]} deck The deck of cards.
 * @returns {number} The first card in the deck.
 */
export const getFirstCard = ([firstCard]) => firstCard;

/**
 * Gets the second card from the deck.
 * (No array[index] or .shift() allowed)
 *
 * @param {number[]} deck The deck of cards.
 * @returns {number} The second card in the deck.
 */
export const getSecondCard = ([, secondCard]) => secondCard;

/**
 * Swaps the positions of the first two cards in the deck.
 * (No function calls allowed for swapping)
 *
 * @param {number[]} deck The deck of cards (assumed to have at least two).
 * @returns {number[]} A new array with the first two cards swapped.
 */
export const swapTwoCards = ([card1, card2, ...rest]) => [card2, card1, ...rest];

/**
 * Shifts the first three cards around: top to back, middle to first, bottom to middle.
 * (No function calls allowed for shifting)
 *
 * @param {number[]} deck The deck of cards (assumed to have at least three).
 * @returns {number[]} A new array with the first three cards rearranged.
 */
export const shiftThreeCardsAround = ([first, second, third, ...rest]) => [second, third, first, ...rest];

/**
 * Picks the 'chosen' pile from an object containing two piles.
 * (No function calls allowed)
 *
 * @param {object} piles An object containing 'chosen' and 'disregarded' array properties.
 * @param {number[]} piles.chosen The pile that was chosen.
 * @param {number[]} piles.disregarded The pile that was disregarded.
 * @returns {number[]} The chosen pile.
 */
export const pickNamedPile = ({ chosen }) => chosen;

/**
 * Swaps the 'chosen' and 'disregarded' piles in a new object.
 * (No function calls allowed)
 *
 * @param {object} piles An object containing 'chosen' and 'disregarded' array properties.
 * @param {number[]} piles.chosen The pile that was chosen.
 * @param {number[]} piles.disregarded The pile that was disregarded.
 * @returns {object} A new object with the 'chosen' and 'disregarded' piles swapped.
 */
export const swapNamedPile = ({ chosen, disregarded }) => ({ chosen: disregarded, disregarded: chosen });