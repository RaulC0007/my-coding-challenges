class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        if (size == 0) {
            return new int[0][0];
        }
        
        int[][] matrix = new int[size][size];
        int top = 0;
        int bottom = size - 1;
        int left = 0;
        int right = size - 1;
        int num = 1;
        
        while (top <= bottom && left <= right) {
            // 1. Traverse from left to right along the top row
            for (int i = left; i <= right; i++) {
                matrix[top][i] = num++;
            }
            top++;
            
            // 2. Traverse from top to bottom along the right column
            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = num++;
            }
            right--;
            
            // 3. Traverse from right to left along the bottom row
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    matrix[bottom][i] = num++;
                }
                bottom--;
            }
            
            // 4. Traverse from bottom to top along the left column
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    matrix[i][left] = num++;
                }
                left++;
            }
        }
        
        return matrix;
    }
}