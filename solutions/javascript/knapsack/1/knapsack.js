export const knapsack = (maximumWeight, items) => {
  // Create DP table: dp[w] = maximum value achievable with weight capacity w
  const dp = new Array(maximumWeight + 1).fill(0);
  
  for (const item of items) {
    // Iterate backwards to avoid reusing the same item multiple times
    for (let w = maximumWeight; w >= item.weight; w--) {
      const includeItem = dp[w - item.weight] + item.value;
      const excludeItem = dp[w];
      dp[w] = Math.max(includeItem, excludeItem);
    }
  }
  
  return dp[maximumWeight];
};
