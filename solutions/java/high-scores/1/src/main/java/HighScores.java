import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class HighScores {

    private final List<Integer> highScores;

    public HighScores(List<Integer> highScores) {
        // Store a copy to prevent external modification of our internal state
        this.highScores = new ArrayList<>(highScores);
    }

    List<Integer> scores() {
        return highScores;
    }

    Integer latest() {
        if (highScores.isEmpty()) {
            return null;
        }
        // The last element in the list is the latest score added
        return highScores.get(highScores.size() - 1);
    }

    Integer personalBest() {
        if (highScores.isEmpty()) {
            return null;
        }
        // Use Collections.max to find the highest score efficiently
        return Collections.max(highScores);
    }

    List<Integer> personalTopThree() {
        // Create a mutable copy to sort without affecting the original order
        List<Integer> sortedScores = new ArrayList<>(highScores);
        
        // Sort in descending order (highest first)
        sortedScores.sort(Collections.reverseOrder());
        
        // Return only the top 3 (or fewer if there aren't 3 scores)
        int limit = Math.min(3, sortedScores.size());
        return sortedScores.subList(0, limit);
    }

}
