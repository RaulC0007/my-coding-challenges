import java.util.ArrayList;
import java.util.List;

public class KillerSudokuHelper {

    // Main method: find combinations with exclusions
    List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, List<Integer> exclude) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        
        // Start backtracking from digit 1
        backtrack(result, current, cageSum, cageSize, exclude, 1);
        
        return result;
    }

    // Overload: find combinations without exclusions
    List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize) {
        return combinationsInCage(cageSum, cageSize, new ArrayList<>());
    }
    
    // Backtracking helper to generate valid combinations
    private void backtrack(List<List<Integer>> result, List<Integer> current, 
                          int remainingSum, int remainingSize, List<Integer> exclude, int start) {
        // Base case: found a valid combination
        if (remainingSize == 0) {
            if (remainingSum == 0) {
                result.add(new ArrayList<>(current));
            }
            return;
        }
        
        // Try each digit from start to 9
        for (int digit = start; digit <= 9; digit++) {
            // Skip excluded digits
            if (exclude.contains(digit)) {
                continue;
            }
            
            // Prune: digit too large for remaining sum
            if (digit > remainingSum) {
                continue;
            }
            
            // Choose: add digit to current combination
            current.add(digit);
            
            // Explore: recurse with next digit (digit+1 ensures no duplicates)
            backtrack(result, current, remainingSum - digit, remainingSize - 1, exclude, digit + 1);
            
            // Unchoose: backtrack for next iteration
            current.remove(current.size() - 1);
        }
    }
}