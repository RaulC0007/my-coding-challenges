import java.util.List;
import java.util.ArrayList;

class Sieve {
    private final int maxPrime;
    
    Sieve(int maxPrime) {
        this.maxPrime = maxPrime;
    }

    List<Integer> getPrimes() {
        List<Integer> primes = new ArrayList<>();
        
        // Handle edge case: no primes below 2
        if (maxPrime < 2) {
            return primes;
        }
        
        // Create sieve array: isPrime[i] = true means i is potentially prime
        boolean[] isPrime = new boolean[maxPrime + 1];
        
        // Initialize all numbers >= 2 as potentially prime
        for (int i = 2; i <= maxPrime; i++) {
            isPrime[i] = true;
        }
        
        // Sieve of Eratosthenes algorithm
        for (int p = 2; p * p <= maxPrime; p++) {
            if (isPrime[p]) {
                // Mark all multiples of p as composite (not prime)
                // Start from p*p: smaller multiples already marked by smaller primes
                for (int multiple = p * p; multiple <= maxPrime; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }
        
        // Collect all numbers still marked as prime
        for (int i = 2; i <= maxPrime; i++) {
            if (isPrime[i]) {
                primes.add(i);
            }
        }
        
        return primes;
    }
}