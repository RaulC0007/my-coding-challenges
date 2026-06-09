class NaturalNumber {
    private final int number;

    NaturalNumber(int number) {
        if (number <= 0) {
            throw new IllegalArgumentException("You must supply a natural number (positive integer)");
        }
        this.number = number;
    }

    Classification getClassification() {
        int aliquotSum = calculateAliquotSum(number);
        
        if (aliquotSum == number) {
            return Classification.PERFECT;
        } else if (aliquotSum > number) {
            return Classification.ABUNDANT;
        } else {
            return Classification.DEFICIENT;
        }
    }

    private int calculateAliquotSum(int n) {
        if (n == 1) return 0; // 1 has no proper divisors
        
        int sum = 1; // 1 is always a proper divisor for n > 1
        // Iterate only up to sqrt(n) for O(√N) efficiency
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                sum += i;
                // Add the complementary divisor if it's different
                if (i != n / i) {
                    sum += n / i;
                }
            }
        }
        return sum;
    }
}