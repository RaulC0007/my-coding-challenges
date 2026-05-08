class Matrix {
    private final int[][] matrix;
    
    Matrix(String matrixAsString) {
        // Handle empty input
        if (matrixAsString == null || matrixAsString.isEmpty()) {
            this.matrix = new int[0][0];
            return;
        }
        
        // Split by newline to get rows
        String[] rows = matrixAsString.split("\n");
        this.matrix = new int[rows.length][];
        
        // Parse each row into integers
        for (int i = 0; i < rows.length; i++) {
            // Split by one or more whitespace characters
            String[] values = rows[i].trim().split("\\s+");
            matrix[i] = new int[values.length];
            for (int j = 0; j < values.length; j++) {
                matrix[i][j] = Integer.parseInt(values[j]);
            }
        }
    }

    int[] getRow(int rowNumber) {
        // Return a defensive copy (1-indexed input)
        return matrix[rowNumber - 1].clone();
    }

    int[] getColumn(int columnNumber) {
        // Extract column values (1-indexed input)
        int[] column = new int[matrix.length];
        for (int i = 0; i < matrix.length; i++) {
            column[i] = matrix[i][columnNumber - 1];
        }
        return column;
    }
}