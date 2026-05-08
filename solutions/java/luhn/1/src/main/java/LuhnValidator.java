class LuhnValidator {

    boolean isValid(String candidate) {
        int sum = 0;
        int digitCount = 0;

        // Iterate backwards to easily identify "every second digit from the right"
        for (int i = candidate.length() - 1; i >= 0; i--) {
            char c = candidate.charAt(i);

            // Skip spaces as allowed by the rules
            if (c == ' ') continue;
            
            // Reject any non-ASCII-digit characters
            if (c < '0' || c > '9') return false;

            int digit = c - '0';
            
            // Every second digit from the right gets doubled
            if (digitCount % 2 == 1) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            
            sum += digit;
            digitCount++;
        }

        // Valid only if >1 digit and sum is divisible by 10
        return digitCount > 1 && sum % 10 == 0;
    }
}