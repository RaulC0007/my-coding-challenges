import java.util.List;
import java.util.Map;
import java.util.HashMap;

class OpticalCharacterReader {

    private static final Map<String, String> PATTERNS = new HashMap<>();
    static {
        PATTERNS.put(" _ | ||_|   ", "0");
        PATTERNS.put("     |  |   ", "1");
        PATTERNS.put(" _  _||_    ", "2");
        PATTERNS.put(" _  _| _|   ", "3");
        PATTERNS.put("   |_|  |   ", "4");
        PATTERNS.put(" _ |_  _|   ", "5");
        PATTERNS.put(" _ |_ |_|   ", "6");
        PATTERNS.put(" _   |  |   ", "7");
        PATTERNS.put(" _ |_||_|   ", "8"); // 🔧 FIX: Eliminado el '_' extra para que sean exactamente 12 caracteres
        PATTERNS.put(" _ |_| _|   ", "9");
    }

    String parse(List<String> input) {
        if (input.size() == 0 || input.size() % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }
        
        if (input.get(0).length() == 0 || input.get(0).length() % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }
        
        int rows = input.size();
        int cols = input.get(0).length();
        
        StringBuilder result = new StringBuilder();
        
        for (int r = 0; r < rows; r += 4) {
            if (r > 0) {
                result.append(",");
            }
            
            for (int c = 0; c < cols; c += 3) {
                String pattern = getPattern(input, r, c);
                result.append(PATTERNS.getOrDefault(pattern, "?"));
            }
        }
        
        return result.toString();
    }
    
    private String getPattern(List<String> input, int rowStart, int colStart) {
        StringBuilder sb = new StringBuilder();
        for (int r = 0; r < 4; r++) {
            for (int c = 0; c < 3; c++) {
                sb.append(input.get(rowStart + r).charAt(colStart + c));
            }
        }
        return sb.toString();
    }
}