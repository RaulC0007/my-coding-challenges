<?php

declare(strict_types=1);

class GameOfLife
{
    public function __construct(public array $matrix)
    {
        // Validate that the matrix is rectangular
        $rows = count($this->matrix);
        if ($rows === 0) {
            return;
        }
        $cols = count($this->matrix[0]);
        for ($i = 1; $i < $rows; $i++) {
            if (count($this->matrix[$i]) !== $cols) {
                throw new InvalidArgumentException("Matrix must be rectangular");
            }
        }
        
        // Validate all cells are 0 or 1
        foreach ($this->matrix as $row) {
            foreach ($row as $cell) {
                if ($cell !== 0 && $cell !== 1) {
                    throw new InvalidArgumentException("Matrix must contain only 0s and 1s");
                }
            }
        }
    }

    private function countLiveNeighbors(int $row, int $col): int
    {
        $count = 0;
        $rows = count($this->matrix);
        $cols = count($this->matrix[0]);
        
        // Check all 8 neighbors
        $neighborOffsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        
        foreach ($neighborOffsets as $offset) {
            $neighborRow = $row + $offset[0];
            $neighborCol = $col + $offset[1];
            
            // Check if neighbor is within bounds
            if ($neighborRow >= 0 && $neighborRow < $rows && 
                $neighborCol >= 0 && $neighborCol < $cols) {
                $count += $this->matrix[$neighborRow][$neighborCol];
            }
        }
        
        return $count;
    }

    private function getNextCellState(int $row, int $col): int
    {
        $liveNeighbors = $this->countLiveNeighbors($row, $col);
        $currentCell = $this->matrix[$row][$col];
        
        // Rule 1: Any live cell with 2 or 3 live neighbors lives on
        if ($currentCell === 1 && ($liveNeighbors === 2 || $liveNeighbors === 3)) {
            return 1;
        }
        
        // Rule 2: Any dead cell with exactly 3 live neighbors becomes a live cell
        if ($currentCell === 0 && $liveNeighbors === 3) {
            return 1;
        }
        
        // Rule 3: All other cells die or stay dead
        return 0;
    }

    public function tick(): void
    {
        $rows = count($this->matrix);
        if ($rows === 0) {
            return;
        }
        $cols = count($this->matrix[0]);
        
        // Create a new matrix for the next generation
        $nextMatrix = array_fill(0, $rows, array_fill(0, $cols, 0));
        
        // Apply rules to each cell
        for ($row = 0; $row < $rows; $row++) {
            for ($col = 0; $col < $cols; $col++) {
                $nextMatrix[$row][$col] = $this->getNextCellState($row, $col);
            }
        }
        
        // Update the matrix
        $this->matrix = $nextMatrix;
    }
}