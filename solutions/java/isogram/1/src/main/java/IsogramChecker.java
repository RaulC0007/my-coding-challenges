class IsogramChecker {

    boolean isIsogram(String phrase) {
        // Track which letters (a-z) we've seen
        boolean[] seen = new boolean[26];
        
        for (int i = 0; i < phrase.length(); i++) {
            char c = Character.toLowerCase(phrase.charAt(i));
            
            // Only process alphabetic characters (ignore spaces, hyphens, punctuation)
            if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (seen[index]) {
                    // Letter already seen - not an isogram
                    return false;
                }
                seen[index] = true;
            }
            // Non-letters are ignored per instructions
        }
        
        return true;
    }
}