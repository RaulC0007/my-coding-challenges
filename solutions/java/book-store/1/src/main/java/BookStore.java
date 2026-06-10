import java.util.*;

class BookStore {
    // Costs in cents to avoid floating-point precision issues during calculations
    // Index 0 is unused, 1 to 5 correspond to the number of different books in the set
    private static final int[] COST = {0, 800, 1520, 2160, 2560, 3000};

    double calculateBasketCost(List<Integer> books) {
        int[] counts = new int[5];
        for (int book : books) {
            counts[book - 1]++;
        }
        
        Map<String, Double> memo = new HashMap<>();
        // Divide by 100.0 at the very end to get the final dollar amount
        return findMinCost(counts, memo) / 100.0;
    }
    
    private double findMinCost(int[] counts, Map<String, Double> memo) {
        // Normalize the state by sorting the counts in descending order.
        // This ensures that [2, 2, 1, 0, 0] and [2, 1, 2, 0, 0] map to the same memoization key.
        int[] sorted = counts.clone();
        Arrays.sort(sorted);
        for (int i = 0; i < 2; i++) {
            int temp = sorted[i];
            sorted[i] = sorted[4 - i];
            sorted[4 - i] = temp;
        }
        
        String key = Arrays.toString(sorted);
        if (memo.containsKey(key)) {
            return memo.get(key);
        }
        
        // Base case: all books have been grouped
        boolean allZero = true;
        for (int c : sorted) {
            if (c > 0) {
                allZero = false;
                break;
            }
        }
        if (allZero) {
            return 0;
        }
        
        double minCost = Double.MAX_VALUE;
        
        // Iterate over all 31 possible non-empty subsets of the 5 books (2^5 - 1)
        for (int mask = 1; mask < 32; mask++) {
            boolean canForm = true;
            int size = 0;
            
            // Check if we can form this subset with the currently available books
            for (int i = 0; i < 5; i++) {
                if ((mask & (1 << i)) != 0) {
                    if (sorted[i] == 0) {
                        canForm = false;
                        break;
                    }
                    size++;
                }
            }
            
            if (canForm) {
                // Deduct the books in this subset and recurse
                int[] nextCounts = sorted.clone();
                for (int i = 0; i < 5; i++) {
                    if ((mask & (1 << i)) != 0) {
                        nextCounts[i]--;
                    }
                }
                
                double cost = COST[size] + findMinCost(nextCounts, memo);
                if (cost < minCost) {
                    minCost = cost;
                }
            }
        }
        
        memo.put(key, minCost);
        return minCost;
    }
}