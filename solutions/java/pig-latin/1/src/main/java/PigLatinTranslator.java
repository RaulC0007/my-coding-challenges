class PigLatinTranslator {
    public String translate(String word) {
        if (word == null || word.isEmpty()) {
            return word;
        }
        
        // Handle phrases: translate each word separately
        if (word.contains(" ")) {
            String[] words = word.split(" ");
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < words.length; i++) {
                result.append(translate(words[i]));
                if (i < words.length - 1) {
                    result.append(" ");
                }
            }
            return result.toString();
        }

        // Rule 1: Words starting with vowel sounds (including "xr" and "yt")
        if (word.startsWith("xr") || word.startsWith("yt") || isVowel(word.charAt(0))) {
            return word + "ay";
        }

        // Find where the consonant cluster ends
        int splitIndex = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            
            // 🔧 FIX 1: Check 'qu' BEFORE vowel check
            // 'u' after 'q' stays with consonant cluster
            if (c == 'u' && i > 0 && word.charAt(i - 1) == 'q') {
                splitIndex = i + 1; // Include the 'u' in the prefix
                break;
            }
            
            if (isVowel(c)) {
                splitIndex = i;
                break;
            }
            
            // 'y' acts as a vowel sound when it's not the first letter
            if (c == 'y' && i > 0) {
                splitIndex = i;
                break;
            }
            // Otherwise it's a standard consonant; keep scanning
        }

        String prefix = word.substring(0, splitIndex);
        String suffix = word.substring(splitIndex);
        return suffix + prefix + "ay";
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}