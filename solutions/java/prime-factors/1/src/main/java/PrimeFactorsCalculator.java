import java.util.List;
import java.util.ArrayList;

class PrimeFactorsCalculator {

    List<Long> calculatePrimeFactorsOf(long number) {
        List<Long> factors = new ArrayList<>();
        
        // Handle factor 2 separately to allow incrementing by 2 later
        while (number % 2 == 0) {
            factors.add(2L);
            number /= 2;
        }
        
        // Check odd divisors from 3 onwards
        for (long divisor = 3; divisor * divisor <= number; divisor += 2) {
            while (number % divisor == 0) {
                factors.add(divisor);
                number /= divisor;
            }
        }
        
        // If number > 1, then it's a prime factor itself
        if (number > 1) {
            factors.add(number);
        }
        
        return factors;
    }
}