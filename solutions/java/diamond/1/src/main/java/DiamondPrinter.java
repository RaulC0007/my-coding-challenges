import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

    List<String> printToList(char letter) {
        if (letter < 'A' || letter > 'Z') {
            throw new IllegalArgumentException("Letter must be between A and Z");
        }
        
        List<String> diamond = new ArrayList<>();
        int n = letter - 'A'; // Distance from 'A'
        
        // Build top half + middle row
        for (int i = 0; i <= n; i++) {
            diamond.add(buildRow(i, n));
        }
        
        // Build bottom half (mirror of top, excluding middle)
        for (int i = n - 1; i >= 0; i--) {
            diamond.add(buildRow(i, n));
        }
        
        return diamond;
    }
    
    private String buildRow(int row, int size) {
        char currentChar = (char) ('A' + row);
        int outerSpaces = size - row;
        int innerSpaces = 2 * row - 1;
        
        StringBuilder sb = new StringBuilder();
        
        // Leading spaces
        for (int i = 0; i < outerSpaces; i++) sb.append(' ');
        
        // First letter
        sb.append(currentChar);
        
        // Inner spaces + second letter (if not the first row)
        if (row > 0) {
            for (int i = 0; i < innerSpaces; i++) sb.append(' ');
            sb.append(currentChar);
        }
        
        // Trailing spaces (optional for alignment, but tests often expect them)
        for (int i = 0; i < outerSpaces; i++) sb.append(' ');
        
        return sb.toString();
    }
}