// @ts-check

/**
 * Double every single card in the deck.
 *
 * @param {number[]} deck The original deck of cards.
 * @returns {number[]} A new deck with every card's value doubled.
 */
export function seeingDouble(deck) {
  // The .map() method is perfect here as it transforms each element
  // and returns a new array without modifying the original.
  return deck.map(card => card * 2);
}

/**
 * Create multiple copies of every 3 found in the deck (triplicate).
 * If a deck started with a single 3, after the trick the deck would have three 3's in place of the original.
 *
 * @param {number[]} deck The original deck of cards.
 * @returns {number[]} A new deck with every '3' triplicated.
 */
export function threeOfEachThree(deck) {
  // Use .reduce() to build a new array.
  // For each card, if it's a 3, add three 3's to the accumulator.
  // Otherwise, add the card itself.
  return deck.reduce((newDeck, card) => {
    if (card === 3) {
      newDeck.push(3, 3, 3); // Add three 3s
    } else {
      newDeck.push(card); // Add the original card
    }
    return newDeck;
  }, []); // Start with an empty array as the accumulator
}

/**
 * Find the two cards from the exact middle of the deck.
 * Assumes a deck of ten cards.
 *
 * @param {number[]} deck The deck of cards (assumed to be 10 cards).
 * @returns {number[]} An array containing the two middle cards.
 */
export function middleTwo(deck) {
  // For a 10-card deck, the middle two cards are at index 4 and 5.
  // The middle index for an even-length array is (length / 2) - 1.
  const midIndex = deck.length / 2;
  // .slice(startIndex, endIndex) extracts elements.
  // It extracts from startIndex up to (but not including) endIndex.
  return deck.slice(midIndex - 1, midIndex + 1);
}

/**
 * The outside two cards will reappear in the middle of the deck, in reverse order.
 * Assumes the deck has an even number of cards.
 *
 * @param {number[]} deck The original deck of cards.
 * @returns {number[]} A new deck with the outside cards moved to the middle.
 */
export function sandwichTrick(deck) {
  // Get the first and last cards.
  const firstCard = deck[0];
  const lastCard = deck[deck.length - 1];

  // Get the middle section of the deck (everything except the first and last).
  // .slice(1, -1) effectively removes the first and last elements.
  const middleSection = deck.slice(1, -1);

  // Use .splice() to insert the lastCard then the firstCard into the middle of the new deck.
  // The middle of the `middleSection` array is at `middleSection.length / 2`.
  middleSection.splice(middleSection.length / 2, 0, lastCard, firstCard);

  return middleSection;
}

/**
 * Every card that isn't 2 disappears from the deck.
 *
 * @param {number[]} deck The original deck of cards.
 * @returns {number[]} A new deck containing only the number 2.
 */
export function twoIsSpecial(deck) {
  // The .filter() method creates a new array with all elements
  // that pass the test implemented by the provided function.
  return deck.filter(card => card === 2);
}

/**
 * Convert a shuffled deck into a perfectly ordered deck (ascending order).
 *
 * @param {number[]} deck The shuffled deck of cards.
 * @returns {number[]} A new deck, perfectly ordered.
 */
export function perfectlyOrdered(deck) {
  // .sort() modifies the array in-place. To avoid modifying the original
  // deck, create a shallow copy first using .slice() or spread syntax.
  const sortedDeck = [...deck]; // Create a copy
  // Sort numerically ascending.
  // The compare function (a, b) => a - b sorts numbers correctly.
  sortedDeck.sort((a, b) => a - b);
  return sortedDeck;
}

/**
 * Reorder the deck: the top card goes to the bottom, the second card to second last, etc.
 * This is effectively reversing the order of the deck.
 *
 * @param {number[]} deck The original deck of cards.
 * @returns {number[]} The reordered deck.
 */
export function reorder(deck) {
  // .reverse() modifies the array in-place.
  // To match the output, it should indeed modify the input deck.
  // If a new array was required, you'd do [...deck].reverse()
  deck.reverse();
  return deck;
}
