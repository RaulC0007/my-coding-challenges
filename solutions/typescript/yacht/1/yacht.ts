export const enum Category {
  ONES,
  TWOS,
  THREES,
  FOURS,
  FIVES,
  SIXES,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  LITTLE_STRAIGHT,
  BIG_STRAIGHT,
  CHOICE,
  YACHT,
}

export const score = (dice: number[], category: Category): number => {
  // Count occurrences of each die face (1-6)
  const counts = [0, 0, 0, 0, 0, 0];
  for (const die of dice) {
    counts[die - 1]++;
  }
  
  switch (category) {
    case Category.ONES:
      return counts[0] * 1;
      
    case Category.TWOS:
      return counts[1] * 2;
      
    case Category.THREES:
      return counts[2] * 3;
      
    case Category.FOURS:
      return counts[3] * 4;
      
    case Category.FIVES:
      return counts[4] * 5;
      
    case Category.SIXES:
      return counts[5] * 6;
      
    case Category.CHOICE:
      return dice.reduce((sum, die) => sum + die, 0);
      
    case Category.YACHT:
      return counts.some(count => count === 5) ? 50 : 0;
      
    case Category.FOUR_OF_A_KIND:
      for (let i = 0; i < 6; i++) {
        if (counts[i] >= 4) {
          return i + 1 === 6 ? 24 : (i + 1) * 4;
        }
      }
      return 0;
      
    case Category.FULL_HOUSE:
      let hasThree = false;
      let hasTwo = false;
      for (const count of counts) {
        if (count === 3) hasThree = true;
        if (count === 2) hasTwo = true;
      }
      return (hasThree && hasTwo) ? dice.reduce((sum, die) => sum + die, 0) : 0;
      
    case Category.LITTLE_STRAIGHT:
      // Check for 1,2,3,4,5
      return counts[0] === 1 && counts[1] === 1 && counts[2] === 1 && 
             counts[3] === 1 && counts[4] === 1 ? 30 : 0;
      
    case Category.BIG_STRAIGHT:
      // Check for 2,3,4,5,6
      return counts[1] === 1 && counts[2] === 1 && counts[3] === 1 && 
             counts[4] === 1 && counts[5] === 1 ? 30 : 0;
      
    default:
      return 0;
  }
};