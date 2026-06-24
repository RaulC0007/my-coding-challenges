import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Arrays;

class ParallelLetterFrequency {
    private final String[] texts;

    ParallelLetterFrequency(String[] texts) {
        this.texts = texts;
    }

    Map<Character, Integer> countLetters() {
        // Use ConcurrentHashMap to safely aggregate results from multiple threads
        Map<Character, Integer> frequencies = new ConcurrentHashMap<>();
        
        // Process each text in parallel using Java Streams
        Arrays.stream(texts)
              .parallel()
              .forEach(text -> {
                  // Process each character in the current text
                  for (char c : text.toCharArray()) {
                      if (Character.isLetter(c)) {
                          char lower = Character.toLowerCase(c);
                          // atomically update the frequency map
                          frequencies.merge(lower, 1, Integer::sum);
                      }
                  }
              });
              
        return frequencies;
    }
}