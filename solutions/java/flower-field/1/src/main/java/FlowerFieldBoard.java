import java.util.ArrayList;
import java.util.List;

class FlowerFieldBoard {
    private final List<String> boardRows;

    FlowerFieldBoard(List<String> boardRows) {
        this.boardRows = boardRows;
    }

    List<String> withNumbers() {
        if (boardRows == null || boardRows.isEmpty()) {
            return boardRows;
        }
        
        List<String> result = new ArrayList<>();
        int rows = boardRows.size();
        int cols = boardRows.get(0).length();
        
        for (int r = 0; r < rows; r++) {
            StringBuilder newRow = new StringBuilder();
            for (int c = 0; c < cols; c++) {
                if (boardRows.get(r).charAt(c) == '*') {
                    newRow.append('*');
                } else {
                    int count = countFlowers(r, c, rows, cols);
                    if (count > 0) {
                        newRow.append(count);
                    } else {
                        newRow.append(' ');
                    }
                }
            }
            result.add(newRow.toString());
        }
        
        return result;
    }
    
    private int countFlowers(int r, int c, int rows, int cols) {
        int count = 0;
        // Check all 8 adjacent directions
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) continue; // Skip the current cell
                
                int nr = r + dr;
                int nc = c + dc;
                
                // Check bounds before accessing the board
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    if (boardRows.get(nr).charAt(nc) == '*') {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}