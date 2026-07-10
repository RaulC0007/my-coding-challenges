import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final String lowerCaseWord;
    private final char[] sortedWordChars;

    public Anagram(String word) {
        // Normalize the target word to lowercase for case-insensitive comparison
        this.lowerCaseWord = word.toLowerCase();
        
        // Sort the characters of the target word to easily check for anagrams later
        char[] chars = lowerCaseWord.toCharArray();
        Arrays.sort(chars);
        this.sortedWordChars = chars;
    }

    public List<String> match(List<String> candidates) {
        List<String> anagrams = new ArrayList<>();
        
        for (String candidate : candidates) {
            String lowerCaseCandidate = candidate.toLowerCase();
            
            // Rule: A word is not its own anagram (case-insensitive)
            if (lowerCaseCandidate.equals(lowerCaseWord)) {
                continue;
            }
            
            // Sort the candidate's characters to compare with the target
            char[] candidateChars = lowerCaseCandidate.toCharArray();
            Arrays.sort(candidateChars);
            
            // If the sorted characters match, it's an anagram!
            if (Arrays.equals(sortedWordChars, candidateChars)) {
                // Add the ORIGINAL candidate to preserve its original casing
                anagrams.add(candidate); 
            }
        }
        
        return anagrams;
    }
}