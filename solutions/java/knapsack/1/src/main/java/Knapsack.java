import java.util.List;

class Knapsack {

    int maximumValue(int maximumWeight, List<Item> items) {
        // dp[w] = maximum value achievable with weight capacity w
        int[] dp = new int[maximumWeight + 1];
        
        // Process each item exactly once (0/1 knapsack)
        for (Item item : items) {
            // Iterate BACKWARDS to avoid reusing the same item
            for (int w = maximumWeight; w >= item.weight; w--) {
                // Choose: take item or skip it — whichever gives more value
                dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
            }
        }
        
        return dp[maximumWeight];
    }
}