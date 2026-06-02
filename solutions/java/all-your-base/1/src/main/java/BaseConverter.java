import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class BaseConverter {
    private final int decimalValue;
    
    BaseConverter(int originalBase, int[] originalDigits) {
        // Validate original base
        if (originalBase < 2) {
            throw new IllegalArgumentException("Bases must be at least 2.");
        }
        
        // Validate digits and convert to decimal (base 10)
        int value = 0;
        for (int digit : originalDigits) {
            if (digit < 0) {
                throw new IllegalArgumentException("Digits may not be negative.");
            }
            if (digit >= originalBase) {
                throw new IllegalArgumentException("All digits must be strictly less than the base.");
            }
            // Horner's method: value = value * base + digit
            value = value * originalBase + digit;
        }
        
        this.decimalValue = value;
    }
    
    int[] convertToBase(int newBase) {
        // Validate new base
        if (newBase < 2) {
            throw new IllegalArgumentException("Bases must be at least 2.");
        }
        
        // Handle zero as special case
        if (decimalValue == 0) {
            return new int[]{0};
        }
        
        // Convert decimal to new base using repeated division
        List<Integer> digits = new ArrayList<>();
        int value = decimalValue;
        
        while (value > 0) {
            digits.add(value % newBase);  // Remainder is the next digit
            value /= newBase;              // Integer division for next iteration
        }
        
        // Digits were collected in reverse order, so reverse them
        Collections.reverse(digits);
        
        // Convert List<Integer> to int[]
        return digits.stream().mapToInt(Integer::intValue).toArray();
    }
}