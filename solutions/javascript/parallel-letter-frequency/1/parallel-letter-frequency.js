// parallel-letter-frequency.js

export const parallelLetterFrequency = async (texts) => {
  // Helper function to process a single text block asynchronously
  const countLetters = async (text) => {
    const localCounts = {};
    // Match any unicode letter, fallback to empty array if null
    const letters = text.toLowerCase().match(/\p{L}/gu) || [];
    
    for (const char of letters) {
      localCounts[char] = (localCounts[char] || 0) + 1;
    }
    return localCounts;
  };

  // Execute all text parsing concurrently
  const results = await Promise.all(texts.map(countLetters));

  // Reduce the array of local tally objects into one grand total object
  return results.reduce((totals, current) => {
    for (const [char, count] of Object.entries(current)) {
      totals[char] = (totals[char] || 0) + count;
    }
    return totals;
  }, {});
};
