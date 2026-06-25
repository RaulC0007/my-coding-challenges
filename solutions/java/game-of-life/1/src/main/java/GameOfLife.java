class GameOfLife {
    public int[][] tick(int[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            return matrix;
        }
        
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] nextGen = new int[rows][cols];
        
        // Direction vectors for 8 neighbors: up, down, left, right, and 4 diagonals
        int[] dx = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dy = {-1, 0, 1, -1, 1, -1, 0, 1};
        
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                int liveNeighbors = countLiveNeighbors(matrix, row, col, dx, dy);
                
                if (matrix[row][col] == 1) {
                    // Live cell: survives with 2 or 3 neighbors
                    nextGen[row][col] = (liveNeighbors == 2 || liveNeighbors == 3) ? 1 : 0;
                } else {
                    // Dead cell: becomes alive with exactly 3 neighbors
                    nextGen[row][col] = (liveNeighbors == 3) ? 1 : 0;
                }
            }
        }
        
        return nextGen;
    }
    
    private int countLiveNeighbors(int[][] matrix, int row, int col, int[] dx, int[] dy) {
        int count = 0;
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        for (int i = 0; i < 8; i++) {
            int newRow = row + dx[i];
            int newCol = col + dy[i];
            
            // Check bounds before accessing
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += matrix[newRow][newCol];
            }
        }
        
        return count;
    }
}