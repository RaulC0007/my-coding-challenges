export const chain = (dominoes) => {
  if (dominoes.length === 0) return [];
  
  // Try to build a chain starting from each domino in each orientation
  for (let i = 0; i < dominoes.length; i++) {
    const [a, b] = dominoes[i];
    
    // Try normal orientation
    let result = tryChain([[a, b]], [...dominoes.slice(0, i), ...dominoes.slice(i + 1)]);
    if (result) return result;
    
    // Try flipped orientation if different
    if (a !== b) {
      result = tryChain([[b, a]], [...dominoes.slice(0, i), ...dominoes.slice(i + 1)]);
      if (result) return result;
    }
  }
  
  return null; // Return null when no valid chain found
};

function tryChain(currentChain, remaining) {
  if (remaining.length === 0) {
    // Check if first and last match (circular chain)
    if (currentChain[0][0] === currentChain[currentChain.length - 1][1]) {
      return currentChain;
    }
    return null;
  }
  
  const lastNumber = currentChain[currentChain.length - 1][1];
  
  for (let i = 0; i < remaining.length; i++) {
    const [a, b] = remaining[i];
    
    // Try connecting with normal orientation
    if (a === lastNumber) {
      const result = tryChain(
        [...currentChain, [a, b]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      );
      if (result) return result;
    }
    
    // Try connecting with flipped orientation
    if (b === lastNumber && a !== b) {
      const result = tryChain(
        [...currentChain, [b, a]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      );
      if (result) return result;
    }
  }
  
  return null;
}