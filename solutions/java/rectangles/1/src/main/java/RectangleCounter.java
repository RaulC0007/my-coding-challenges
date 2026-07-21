class RectangleCounter {

    int countRectangles(String[] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }
        
        int rows = grid.length;
        int cols = grid[0].length();
        int count = 0;

        // Iteramos sobre todas las posibles esquinas superior-izquierda (r1, c1)
        for (int r1 = 0; r1 < rows; r1++) {
            for (int c1 = 0; c1 < cols; c1++) {
                if (grid[r1].charAt(c1) == '+') {
                    
                    // Iteramos sobre todas las posibles esquinas inferior-derecha (r2, c2)
                    for (int r2 = r1 + 1; r2 < rows; r2++) {
                        for (int c2 = c1 + 1; c2 < cols; c2++) {
                            
                            // Verificamos si las otras dos esquinas también son '+'
                            if (grid[r2].charAt(c2) == '+' &&
                                grid[r1].charAt(c2) == '+' &&
                                grid[r2].charAt(c1) == '+') {
                                
                                // Verificamos que los bordes sean válidos
                                if (checkHorizontal(grid, r1, c1, c2) &&
                                    checkHorizontal(grid, r2, c1, c2) &&
                                    checkVertical(grid, c1, r1, r2) &&
                                    checkVertical(grid, c2, r1, r2)) {
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return count;
    }

    // Verifica que el borde horizontal solo contenga '-' o '+'
    private boolean checkHorizontal(String[] grid, int r, int c1, int c2) {
        for (int c = c1 + 1; c < c2; c++) {
            char ch = grid[r].charAt(c);
            if (ch != '-' && ch != '+') {
                return false;
            }
        }
        return true;
    }

    // Verifica que el borde vertical solo contenga '|' o '+'
    private boolean checkVertical(String[] grid, int c, int r1, int r2) {
        for (int r = r1 + 1; r < r2; r++) {
            char ch = grid[r].charAt(c);
            if (ch != '|' && ch != '+') {
                return false;
            }
        }
        return true;
    }
}