import java.util.Map;
import java.util.HashMap;

class WordCount {
    public Map<String, Integer> phrase(String input) {
        Map<String, Integer> wordCounts = new HashMap<>();
        
        if (input == null || input.isEmpty()) {
            return wordCounts;
        }
        
        // Convert to lowercase for case-insensitive counting
        String lower = input.toLowerCase();
        
        // Split on anything that's NOT a letter, digit, or apostrophe
        // This preserves apostrophes within contractions like "don't"
        String[] tokens = lower.split("[^a-z0-9']+");
        
        for (String token : tokens) {
            // Trim leading/trailing apostrophes (e.g., 'quote' -> quote)
            // but keep internal apostrophes (e.g., that's -> that's)
            String word = token.replaceAll("^'+|'+$", "");
            
            // Skip empty strings from consecutive delimiters or pure apostrophes
            if (!word.isEmpty()) {
                wordCounts.put(word, wordCounts.getOrDefault(word, 0) + 1);
            }
        }
        
        return wordCounts;
    }
}