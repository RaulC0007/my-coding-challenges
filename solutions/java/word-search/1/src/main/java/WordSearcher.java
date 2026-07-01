import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

class WordSearcher {
    Map<String, Optional<WordLocation>> search(final Set<String> words, final char[][] grid) {
        Map<String, Optional<WordLocation>> result = new HashMap<>();
        
        // Handle edge case where grid is empty
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            for (String word : words) {
                result.put(word, Optional.empty());
            }
            return result;
        }
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        // 8 possible directions: (row_delta, col_delta)
        // Up-Left, Up, Up-Right, Left, Right, Down-Left, Down, Down-Right
        int[] dr = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dc = {-1, 0, 1, -1, 1, -1, 0, 1};
        
        for (String word : words) {
            boolean found = false;
            
            // Scan every cell in the grid
            for (int r = 0; r < rows && !found; r++) {
                for (int c = 0; c < cols && !found; c++) {
                    
                    // If the first letter matches, check all 8 directions
                    if (grid[r][c] == word.charAt(0)) {
                        for (int d = 0; d < 8; d++) {
                            if (matches(word, grid, r, c, dr[d], dc[d], rows, cols)) {
                                int len = word.length();
                                // Coordinates are 1-based (x = column, y = row)
                                Pair start = new Pair(c + 1, r + 1);
                                Pair end = new Pair(c + (len - 1) * dc[d] + 1, r + (len - 1) * dr[d] + 1);
                                result.put(word, Optional.of(new WordLocation(start, end)));
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }
            
            // If the word wasn't found after scanning the entire grid
            if (!found) {
                result.put(word, Optional.empty());
            }
        }
        
        return result;
    }
    
    // Helper method to check if a word matches in a specific direction
    private boolean matches(String word, char[][] grid, int r, int c, int dr, int dc, int rows, int cols) {
        int len = word.length();
        int endR = r + (len - 1) * dr;
        int endC = c + (len - 1) * dc;
        
        // Check if the word fits within the grid boundaries
        if (endR < 0 || endR >= rows || endC < 0 || endC >= cols) {
            return false;
        }
        
        // Check character by character
        for (int i = 0; i < len; i++) {
            if (grid[r + i * dr][c + i * dc] != word.charAt(i)) {
                return false;
            }
        }
        return true;
    }
}