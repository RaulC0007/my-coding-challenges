import java.util.Map;
import java.util.HashMap;

class NucleotideCounter {
    private final Map<Character, Integer> counts;

    NucleotideCounter(String sequence) {
        // Initialize counts for all four valid nucleotides
        counts = new HashMap<>();
        counts.put('A', 0);
        counts.put('C', 0);
        counts.put('G', 0);
        counts.put('T', 0);

        // Validate and count in a single pass
        for (char nucleotide : sequence.toCharArray()) {
            if (!counts.containsKey(nucleotide)) {
                throw new IllegalArgumentException("Invalid nucleotide in strand");
            }
            counts.put(nucleotide, counts.get(nucleotide) + 1);
        }
    }

    Map<Character, Integer> nucleotideCounts() {
        return counts;
    }
}