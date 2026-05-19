class PrimeCalculator {

    int nth(int nth) {
        if (nth < 1) {
            throw new IllegalArgumentException("nth must be at least 1");
        }
        
        int count = 0;
        int candidate = 2;
        
        while (true) {
            if (isPrime(candidate)) {
                count++;
                if (count == nth) {
                    return candidate;
                }
            }
            candidate++;
        }
    }
    
    private boolean isPrime(int number) {
        if (number < 2) return false;
        if (number == 2) return true;
        if (number % 2 == 0) return false;
        
        // Check odd divisors only, up to sqrt(number)
        for (int i = 3; i * i <= number; i += 2) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }
}