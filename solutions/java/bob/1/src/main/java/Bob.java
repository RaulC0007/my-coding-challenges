class Bob {

    String hey(String input) {
        String trimmed = input.trim();
        
        // Check for silence first
        if (trimmed.isEmpty()) {
            return "Fine. Be that way!";
        }
        
        boolean isQuestion = trimmed.endsWith("?");
        boolean isYelling = isYelling(trimmed);
        
        if (isYelling && isQuestion) {
            return "Calm down, I know what I'm doing!";
        }
        if (isYelling) {
            return "Whoa, chill out!";
        }
        if (isQuestion) {
            return "Sure.";
        }
        
        return "Whatever.";
    }
    
    // Helper: determines if text is "yelling" (contains letters, all uppercase)
    private boolean isYelling(String text) {
        boolean hasLetter = false;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isLetter(c)) {
                hasLetter = true;
                if (Character.isLowerCase(c)) {
                    return false; // Found a lowercase letter -> not yelling
                }
            }
        }
        return hasLetter; // Must contain at least one letter to be yelling
    }
}