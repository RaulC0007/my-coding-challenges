<?php
declare(strict_types=1);

class FlowerField
{
    private array $garden;
    private int $rows;
    private int $cols;

    public function __construct(array $garden)
    {
        $this->garden = $garden;
        $this->rows = count($garden);
        $this->cols = $this->rows > 0 ? strlen($garden[0]) : 0;
    }

    public function annotate(): array
    {
        $result = [];
        
        for ($r = 0; $r < $this->rows; $r++) {
            $row = '';
            for ($c = 0; $c < $this->cols; $c++) {
                if ($this->garden[$r][$c] === '*') {
                    $row .= '*';
                } else {
                    $count = $this->countAdjacentFlowers($r, $c);
                    $row .= $count > 0 ? (string)$count : ' ';
                }
            }
            $result[] = $row;
        }
        
        return $result;
    }

    private function countAdjacentFlowers(int $r, int $c): int
    {
        $count = 0;
        $directions = [
            [-1,-1],[-1,0],[-1,1],
            [0,-1],        [0,1],
            [1,-1], [1,0], [1,1]
        ];
        
        foreach ($directions as [$dr, $dc]) {
            $nr = $r + $dr;
            $nc = $c + $dc;
            if ($nr >= 0 && $nr < $this->rows && $nc >= 0 && $nc < $this->cols) {
                if ($this->garden[$nr][$nc] === '*') {
                    $count++;
                }
            }
        }
        return $count;
    }
}
?>
