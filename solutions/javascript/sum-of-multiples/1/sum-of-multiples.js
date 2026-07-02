export const sum = (itemBaseValues, level) => {
  const multiples = new Set();

  for (const baseValue of itemBaseValues) {
    // If a magical item has a base value of 0, skip it. 
    // It doesn't add to the sum and would cause an infinite loop.
    if (baseValue === 0) continue;

    // Find all multiples of the base value strictly less than the level
    for (let multiple = baseValue; multiple < level; multiple += baseValue) {
      multiples.add(multiple);
    }
  }

  // Convert the Set to an array and sum up all the unique multiples
  return [...multiples].reduce((total, current) => total + current, 0);
};
