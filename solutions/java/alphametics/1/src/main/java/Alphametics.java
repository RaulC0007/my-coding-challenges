import java.util.*;

class Alphametics {
    private final List<String> leftWords;
    private final String rightWord;
    private final List<Character> uniqueChars;
    private final Set<Character> leadingChars;
    private final Map<Character, Integer> charToIndex;
    private final long[] charWeights;
    private Map<Character, Integer> solution;

    Alphametics(String userInput) {
        String[] parts = userInput.split("==");
        String leftSide = parts[0].trim();
        String rightSide = parts[1].trim();
        
        this.leftWords = new ArrayList<>();
        for (String word : leftSide.split("\\+")) {
            this.leftWords.add(word.trim());
        }
        this.rightWord = rightSide;
        
        this.uniqueChars = new ArrayList<>();
        this.leadingChars = new HashSet<>();
        this.charToIndex = new HashMap<>();
        
        Set<Character> seen = new HashSet<>();
        
        // Process left side words
        for (String word : leftWords) {
            if (word.length() > 1) {
                leadingChars.add(word.charAt(0));
            }
            for (char c : word.toCharArray()) {
                if (seen.add(c)) {
                    uniqueChars.add(c);
                    charToIndex.put(c, uniqueChars.size() - 1);
                }
            }
        }
        
        // Process right side word
        if (rightWord.length() > 1) {
            leadingChars.add(rightWord.charAt(0));
        }
        for (char c : rightWord.toCharArray()) {
            if (seen.add(c)) {
                uniqueChars.add(c);
                charToIndex.put(c, uniqueChars.size() - 1);
            }
        }
        
        // Precompute the mathematical "weight" of each character
        // This allows O(N) validation instead of string parsing
        this.charWeights = new long[uniqueChars.size()];
        for (String word : leftWords) {
            long multiplier = 1;
            for (int i = word.length() - 1; i >= 0; i--) {
                charWeights[charToIndex.get(word.charAt(i))] += multiplier;
                multiplier *= 10;
            }
        }
        
        long multiplier = 1;
        for (int i = rightWord.length() - 1; i >= 0; i--) {
            charWeights[charToIndex.get(rightWord.charAt(i))] -= multiplier;
            multiplier *= 10;
        }
    }

    Map<Character, Integer> solve() throws UnsolvablePuzzleException {
        // A base-10 system can only represent 10 unique digits
        if (uniqueChars.size() > 10) {
            throw new UnsolvablePuzzleException();
        }
        
        int[] assignment = new int[uniqueChars.size()];
        boolean[] used = new boolean[10];
        
        if (backtrack(0, assignment, used)) {
            return solution;
        } else {
            throw new UnsolvablePuzzleException();
        }
    }
    
    private boolean backtrack(int index, int[] assignment, boolean[] used) {
        // Base case: all characters have been assigned a digit
        if (index == uniqueChars.size()) {
            if (isValid(assignment)) {
                solution = new HashMap<>();
                for (int i = 0; i < uniqueChars.size(); i++) {
                    solution.put(uniqueChars.get(i), assignment[i]);
                }
                return true;
            }
            return false;
        }
        
        char c = uniqueChars.get(index);
        boolean isLeading = leadingChars.contains(c);
        
        // Try assigning digits 0-9
        for (int d = 0; d <= 9; d++) {
            if (!used[d]) {
                // Leading digits of multi-digit numbers cannot be 0
                if (d == 0 && isLeading) {
                    continue;
                }
                
                used[d] = true;
                assignment[index] = d;
                
                if (backtrack(index + 1, assignment, used)) {
                    return true;
                }
                
                used[d] = false; // Backtrack
            }
        }
        return false;
    }
    
    private boolean isValid(int[] assignment) {
        long sum = 0;
        for (int i = 0; i < uniqueChars.size(); i++) {
            sum += assignment[i] * charWeights[i];
        }
        return sum == 0;
    }
}