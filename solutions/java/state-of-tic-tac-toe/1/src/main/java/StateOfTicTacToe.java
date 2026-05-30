class StateOfTicTacToe {
    public GameState determineState(String[] board) {
        int xCount = 0;
        int oCount = 0;
        
        // Count X's and O's
        for (String row : board) {
            for (int i = 0; i < row.length(); i++) {
                char c = row.charAt(i);
                if (c == 'X') xCount++;
                else if (c == 'O') oCount++;
            }
        }
        
        // Rule 1: X starts, players alternate
        if (oCount > xCount) {
            throw new IllegalArgumentException("Wrong turn order: O started");
        }
        if (xCount > oCount + 1) {
            throw new IllegalArgumentException("Wrong turn order: X went twice");
        }
        
        boolean xWins = hasWinningLine(board, 'X');
        boolean oWins = hasWinningLine(board, 'O');
        
        // Rule 2: Both players cannot win simultaneously
        if (xWins && oWins) {
            throw new IllegalArgumentException("Impossible board: game should have ended after the game was won");
        }
        
        // Rule 3: If X wins, X must have made the last move
        if (xWins && xCount != oCount + 1) {
            throw new IllegalArgumentException("Impossible board: game should have ended after the game was won");
        }
        
        // Rule 4: If O wins, O must have made the last move
        if (oWins && xCount != oCount) {
            throw new IllegalArgumentException("Impossible board: game should have ended after the game was won");
        }
        
        // 🔧 FIX: Return WIN for legitimate wins (only reached if no exceptions above)
        if (xWins || oWins) {
            return GameState.WIN;
        }
        
        // Determine remaining states
        if (xCount + oCount == 9) {
            return GameState.DRAW;
        }
        return GameState.ONGOING;
    }
    
    private boolean hasWinningLine(String[] board, char player) {
        // Check rows
        for (int i = 0; i < 3; i++) {
            if (board[i].charAt(0) == player && 
                board[i].charAt(1) == player && 
                board[i].charAt(2) == player) {
                return true;
            }
        }
        // Check columns
        for (int j = 0; j < 3; j++) {
            if (board[0].charAt(j) == player && 
                board[1].charAt(j) == player && 
                board[2].charAt(j) == player) {
                return true;
            }
        }
        // Check diagonals
        if (board[0].charAt(0) == player && board[1].charAt(1) == player && board[2].charAt(2) == player) return true;
        if (board[0].charAt(2) == player && board[1].charAt(1) == player && board[2].charAt(0) == player) return true;
        
        return false;
    }
}