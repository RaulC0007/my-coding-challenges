class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        // Remove hyphens to get the raw ISBN digits
        String cleaned = stringToVerify.replace("-", "");
        
        // ISBN-10 must be exactly 10 characters long
        if (cleaned.length() != 10) {
            return false;
        }
        
        int sum = 0;
        
        for (int i = 0; i < 10; i++) {
            char c = cleaned.charAt(i);
            int value;
            
            if (i == 9 && c == 'X') {
                // 'X' is only valid as the last character (check digit), represents 10
                value = 10;
            } else if (c >= '0' && c <= '9') {
                // Convert digit character to numeric value
                value = c - '0';
            } else {
                // Invalid character found (e.g., 'X' in wrong position, letters, etc.)
                return false;
            }
            
            // Apply weight: position 0 gets weight 10, position 1 gets 9, ..., position 9 gets 1
            sum += value * (10 - i);
        }
        
        // Valid if sum is divisible by 11
        return sum % 11 == 0;
    }
}