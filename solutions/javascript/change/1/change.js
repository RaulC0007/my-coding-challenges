export class Change {
  calculate(coinArray, target) {
    if (target < 0) {
      throw new Error('Negative totals are not allowed.');
    }
    
    if (target === 0) {
      return [];
    }
    
    // Sort coins in descending order for the greedy approach
    // But note: greedy doesn't always work for all coin systems
    // For a correct solution, we need dynamic programming
    
    // Use dynamic programming to find the minimum number of coins
    const dp = new Array(target + 1).fill(Infinity);
    const coinUsed = new Array(target + 1).fill(-1);
    
    dp[0] = 0;
    
    for (let i = 1; i <= target; i++) {
      for (const coin of coinArray) {
        if (i >= coin && dp[i - coin] + 1 < dp[i]) {
          dp[i] = dp[i - coin] + 1;
          coinUsed[i] = coin;
        }
      }
    }
    
    if (dp[target] === Infinity) {
      throw new Error(`The total ${target} cannot be represented in the given currency.`);
    }
    
    // Reconstruct the coin combination
    const result = [];
    let remaining = target;
    while (remaining > 0) {
      const coin = coinUsed[remaining];
      result.push(coin);
      remaining -= coin;
    }
    
    return result.sort((a, b) => a - b);
  }
}