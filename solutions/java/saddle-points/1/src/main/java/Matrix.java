import java.util.List;
import java.util.Set;
import java.util.HashSet;

class Matrix {
    private final List<List<Integer>> values;
    
    Matrix(List<List<Integer>> values) {
        this.values = values;
    }

    Set<MatrixCoordinate> getSaddlePoints() {
        Set<MatrixCoordinate> saddlePoints = new HashSet<>();
        
        // Handle empty matrix
        if (values == null || values.isEmpty()) {
            return saddlePoints;
        }
        
        int rows = values.size();
        
        // Check each cell in the matrix
        for (int row = 0; row < rows; row++) {
            List<Integer> rowData = values.get(row);
            
            // Handle empty or irregular rows
            if (rowData == null || rowData.isEmpty()) {
                continue;
            }
            
            int cols = rowData.size();
            
            for (int col = 0; col < cols; col++) {
                int value = rowData.get(col);
                
                // Check if value is the maximum in its row
                boolean isMaxInRow = true;
                for (int c = 0; c < cols; c++) {
                    if (rowData.get(c) > value) {
                        isMaxInRow = false;
                        break;
                    }
                }
                
                if (!isMaxInRow) {
                    continue;
                }
                
                // Check if value is the minimum in its column
                boolean isMinInColumn = true;
                for (int r = 0; r < rows; r++) {
                    List<Integer> otherRow = values.get(r);
                    // Handle irregular matrices: skip if column doesn't exist in this row
                    if (col >= otherRow.size() || otherRow.get(col) < value) {
                        isMinInColumn = false;
                        break;
                    }
                }
                
                if (isMinInColumn) {
                    // MatrixCoordinate uses 1-based indexing
                    saddlePoints.add(new MatrixCoordinate(row + 1, col + 1));
                }
            }
        }
        
        return saddlePoints;
    }
}