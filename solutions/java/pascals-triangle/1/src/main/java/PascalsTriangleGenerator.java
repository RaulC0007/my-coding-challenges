class PascalsTriangleGenerator {

    int[][] generateTriangle(int rows) {
        // Handle edge case: zero rows
        if (rows == 0) {
            return new int[0][];
        }
        
        // Create jagged 2D array: row i has (i+1) elements
        int[][] triangle = new int[rows][];
        
        for (int i = 0; i < rows; i++) {
            triangle[i] = new int[i + 1];
            
            // First and last elements are always 1
            triangle[i][0] = 1;
            triangle[i][i] = 1;
            
            // Compute middle elements as sum of two values from previous row
            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
        
        return triangle;
    }
}