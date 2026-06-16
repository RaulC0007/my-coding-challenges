import java.util.HashSet;
import java.util.Set;

class SumOfMultiples {
    private final int level;
    private final int[] bases;
    
    SumOfMultiples(int number, int[] set) {
        this.level = number;
        this.bases = set;
    }

    int getSum() {
        Set<Integer> multiples = new HashSet<>();
        
        for (int base : bases) {
            // Skip invalid bases (0 or negative) to avoid infinite loops
            if (base <= 0) {
                continue;
            }
            
            // Find all multiples of base that are less than level
            for (int multiple = base; multiple < level; multiple += base) {
                multiples.add(multiple);
            }
        }
        
        // Sum all unique multiples
        int sum = 0;
        for (int m : multiples) {
            sum += m;
        }
        return sum;
    }
}