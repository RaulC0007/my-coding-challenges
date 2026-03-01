def gamestate(board):
    """
    Determines the state of a 3x3 tic-tac-toe game with specific error messages for Exercism.
    """
    # Flatten the board to count Xs and Os
    flat_board = "".join(board)
    count_x = flat_board.count('X')
    count_o = flat_board.count('O')
    
    # Validate turn order counts with specific Exercism error messages
    if count_x > count_o + 1:
        raise ValueError("Wrong turn order: X went twice")
    if count_o > count_x:
        raise ValueError("Wrong turn order: O started")
    
    def check_win(player):
        # Rows
        for row in board:
            if all(cell == player for cell in row):
                return True
        # Columns
        for col in range(3):
            if all(board[row][col] == player for row in range(3)):
                return True
        # Diagonals
        if all(board[i][i] == player for i in range(3)):
            return True
        if all(board[i][2-i] == player for i in range(3)):
            return True
        return False
    
    x_wins = check_win('X')
    o_wins = check_win('O')
    
    # Check for impossible state: both players winning or continued play
    if x_wins and o_wins:
        raise ValueError("Impossible board: game should have ended after the game was won")
    
    if x_wins:
        # If X wins, they must have exactly one more mark than O
        if count_x != count_o + 1:
            raise ValueError("Impossible board: game should have ended after the game was won")
        return "win"
        
    if o_wins:
        # If O wins, mark counts must be equal
        if count_x != count_o:
            raise ValueError("Impossible board: game should have ended after the game was won")
        return "win"
    
    # Final state check
    if ' ' not in flat_board:
        return "draw"
    
    return "ongoing"