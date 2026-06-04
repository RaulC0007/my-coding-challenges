class RomanNumerals {
    private final int number;

    RomanNumerals(int number) {
        this.number = number;
    }

    String getRomanNumeral() {
        // Map integer values to their corresponding Roman numeral strings
        // Ordered from largest to smallest to support the greedy algorithm
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        
        StringBuilder roman = new StringBuilder();
        int num = this.number;
        
        // Greedily subtract the largest possible value and append its symbol
        for (int i = 0; i < values.length && num > 0; i++) {
            while (num >= values[i]) {
                num -= values[i];
                roman.append(symbols[i]);
            }
        }
        
        return roman.toString();
    }
}