class PhoneNumber {
    private final String number;
    
    PhoneNumber(String numberString) {
        // Remove allowed punctuation: spaces, dashes, dots, parentheses, plus sign
        String cleaned = numberString.replaceAll("[\\s\\-\\.\\(\\)\\+]", "");
        
        // Check for letters (not permitted in phone numbers)
        if (cleaned.matches(".*[a-zA-Z].*")) {
            throw new IllegalArgumentException("letters not permitted");
        }
        
        // Check for invalid punctuation (anything that's not a digit)
        if (!cleaned.matches("\\d*")) {
            throw new IllegalArgumentException("punctuations not permitted");
        }
        
        // Validate length and handle country code
        if (cleaned.length() < 10) {
            throw new IllegalArgumentException("must not be fewer than 10 digits");
        } else if (cleaned.length() > 11) {
            throw new IllegalArgumentException("must not be greater than 11 digits");
        } else if (cleaned.length() == 11) {
            if (cleaned.charAt(0) != '1') {
                throw new IllegalArgumentException("11 digits must start with 1");
            }
            // Remove valid country code
            cleaned = cleaned.substring(1);
        }
        
        // Now cleaned is exactly 10 digits - validate NANP rules
        // Area code (first 3 digits): first digit must be 2-9
        if (cleaned.charAt(0) == '0') {
            throw new IllegalArgumentException("area code cannot start with zero");
        }
        if (cleaned.charAt(0) == '1') {
            throw new IllegalArgumentException("area code cannot start with one");
        }
        
        // Exchange code (next 3 digits): first digit must be 2-9
        if (cleaned.charAt(3) == '0') {
            throw new IllegalArgumentException("exchange code cannot start with zero");
        }
        if (cleaned.charAt(3) == '1') {
            throw new IllegalArgumentException("exchange code cannot start with one");
        }
        
        this.number = cleaned;
    }

    String getNumber() {
        return number;
    }
}