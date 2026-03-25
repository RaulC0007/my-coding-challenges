// Function to count how many cards of a particular type are in the deck
function cardTypeCheck(deck, cardType) {
  let count = 0;
  deck.forEach(card => {
    if (card === cardType) {
      count++;
    }
  });
  return count;
}

// Function to count how many odd or even cards are in the deck
function determineOddEvenCards(deck, even) {
  let count = 0;
  for (const card of deck) {
    if (even && card % 2 === 0) {
      count++;
    } else if (!even && card % 2 !== 0) {
      count++;
    }
  }
  return count;
}

// Export the functions so they can be used by the test suite
export { cardTypeCheck, determineOddEvenCards };
