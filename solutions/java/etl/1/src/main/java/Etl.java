import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Etl {
    Map<String, Integer> transform(Map<Integer, List<String>> old) {
        Map<String, Integer> result = new HashMap<>();
        
        // Iterate over each score and its associated list of letters
        for (Map.Entry<Integer, List<String>> entry : old.entrySet()) {
            int score = entry.getKey();
            
            // For each letter in the list, convert to lowercase and map to the score
            for (String letter : entry.getValue()) {
                result.put(letter.toLowerCase(), score);
            }
        }
        
        return result;
    }
}