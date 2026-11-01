<?php

declare(strict_types=1);

class WordSearch
{
    private array $grid;
    private int $rows;
    private int $cols;

    public function __construct(array $grid)
    {
        $this->grid = $grid;
        $this->rows = count($grid);
        $this->cols = $this->rows > 0 ? strlen($grid[0]) : 0;
    }

    public function search(string $word): ?Result
    {
        // All 8 possible directions: [row_change, col_change]
        $directions = [
            [0, 1],   // right
            [0, -1],  // left
            [1, 0],   // down
            [-1, 0],  // up
            [1, 1],   // down-right
            [1, -1],  // down-left
            [-1, 1],  // up-right
            [-1, -1]  // up-left
        ];

        $len = strlen($word);

        for ($r = 0; $r < $this->rows; $r++) {
            for ($c = 0; $c < $this->cols; $c++) {
                
                if ($this->grid[$r][$c] === $word[0]) {
                    foreach ($directions as $dir) {
                        $dr = $dir[0];
                        $dc = $dir[1];
                        
                        $match = true;
                        
                        for ($i = 1; $i < $len; $i++) {
                            $nr = $r + $i * $dr;
                            $nc = $c + $i * $dc;
                            
                            if ($nr < 0 || $nr >= $this->rows || $nc < 0 || $nc >= $this->cols) {
                                $match = false;
                                break;
                            }
                            
                            if ($this->grid[$nr][$nc] !== $word[$i]) {
                                $match = false;
                                break;
                            }
                        }
                        
                        if ($match) {
                            return new Result(
                                new Location(column: $c + 1, row: $r + 1),
                                new Location(column: $c + 1 + ($len - 1) * $dc, row: $r + 1 + ($len - 1) * $dr)
                            );
                        }
                    }
                }
            }
        }

        return null;
    }
}