class LargestSeriesProductCalculator {
    private final String inputNumber;
    
    LargestSeriesProductCalculator(String inputNumber) {
        // Validate that input contains only digits
        if (inputNumber == null) {
            throw new IllegalArgumentException("String to search must not be null");
        }
        for (int i = 0; i < inputNumber.length(); i++) {
            char c = inputNumber.charAt(i);
            if (!Character.isDigit(c)) {
                throw new IllegalArgumentException("String to search may only contain digits.");
            }
        }
        this.inputNumber = inputNumber;
    }

    long calculateLargestProductForSeriesLength(int numberOfDigits) {
        // Validate span
        if (numberOfDigits < 0) {
            throw new IllegalArgumentException("Series length must be non-negative.");
        }
        if (numberOfDigits > inputNumber.length()) {
            throw new IllegalArgumentException("Series length must be less than or equal to the length of the string to search.");
        }
        
        // Edge case: span of 0 returns 1 (empty product)
        if (numberOfDigits == 0) {
            return 1;
        }
        
        long maxProduct = 0;
        
        // Slide window of size numberOfDigits across the input
        for (int i = 0; i <= inputNumber.length() - numberOfDigits; i++) {
            long product = 1;
            for (int j = 0; j < numberOfDigits; j++) {
                int digit = inputNumber.charAt(i + j) - '0';
                product *= digit;
            }
            maxProduct = Math.max(maxProduct, product);
        }
        
        return maxProduct;
    }
}