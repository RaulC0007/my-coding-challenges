<?php

/*
 * By adding type hints and enabling strict type checking, code can become
 * easier to read, self-documenting and reduce the number of potential bugs.
 * By default, type declarations are non-strict, which means they will attempt
 * to change the original type to match the type specified by the
 * type-declaration.
 *
 * In other words, if you pass a string to a function requiring a float,
 * it will attempt to convert the string value to a float.
 *
 * To enable strict mode, a single declare directive must be placed at the top
 * of the file.
 * This means that the strictness of typing is configured on a per-file basis.
 * This directive not only affects the type declarations of parameters, but also
 * a function's return type.
 *
 * For more info review the Concept on strict type checking in the PHP track
 * <link>.
 *
 * To disable strict typing, comment out the directive below.
 */

declare(strict_types=1);

enum State
{
    case Win;
    case Ongoing;
    case Draw;
}

class StateOfTicTacToe
{
    public function gameState(array $board): State
    {
        // Count X's and O's
        $xCount = 0;
        $oCount = 0;
        
        foreach ($board as $row) {
            for ($i = 0; $i < strlen($row); $i++) {
                if ($row[$i] === 'X') {
                    $xCount++;
                } elseif ($row[$i] === 'O') {
                    $oCount++;
                }
            }
        }
        
        // Validate turn order: X starts, so X count should be equal to O count or O count + 1
        if ($xCount > $oCount + 1) {
            throw new RuntimeException("Wrong turn order: X went twice");
        }
        
        if ($oCount > $xCount) {
            throw new RuntimeException("Wrong turn order: O started");
        }
        
        // Check for winners
        $xWon = $this->hasWon($board, 'X');
        $oWon = $this->hasWon($board, 'O');
        
        // If someone won, the game should have ended
        if ($xWon || $oWon) {
            // Check if players kept playing after someone won
            if ($xWon && $xCount === $oCount) {
                throw new RuntimeException("Impossible board: game should have ended after the game was won");
            }
            if ($oWon && $xCount > $oCount) {
                throw new RuntimeException("Impossible board: game should have ended after the game was won");
            }
        }
        
        // Both can't win
        if ($xWon && $oWon) {
            throw new RuntimeException("Impossible board: game should have ended after the game was won");
        }
        
        // Determine game state
        if ($xWon || $oWon) {
            return State::Win;
        }
        
        // If board is full, it's a draw
        if ($xCount + $oCount === 9) {
            return State::Draw;
        }
        
        // Otherwise, game is ongoing
        return State::Ongoing;
    }
    
    private function hasWon(array $board, string $player): bool
    {
        // Check rows
        for ($row = 0; $row < 3; $row++) {
            if ($board[$row][0] === $player && $board[$row][1] === $player && $board[$row][2] === $player) {
                return true;
            }
        }
        
        // Check columns
        for ($col = 0; $col < 3; $col++) {
            if ($board[0][$col] === $player && $board[1][$col] === $player && $board[2][$col] === $player) {
                return true;
            }
        }
        
        // Check diagonals
        if ($board[0][0] === $player && $board[1][1] === $player && $board[2][2] === $player) {
            return true;
        }
        
        if ($board[0][2] === $player && $board[1][1] === $player && $board[2][0] === $player) {
            return true;
        }
        
        return false;
    }
}