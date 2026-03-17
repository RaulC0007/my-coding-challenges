<?php
declare(strict_types=1);

function score(string $word): int
{
    $values = [
        'A' => 1, 'E' => 1, 'I' => 1, 'O' => 1, 'U' => 1,
        'L' => 1, 'N' => 1, 'R' => 1, 'S' => 1, 'T' => 1,
        'D' => 2, 'G' => 2,
        'B' => 3, 'C' => 3, 'M' => 3, 'P' => 3,
        'F' => 4, 'H' => 4, 'V' => 4, 'W' => 4, 'Y' => 4,
        'K' => 5,
        'J' => 8, 'X' => 8,
        'Q' => 10, 'Z' => 10,
    ];
    
    $total = 0;
    $word = strtoupper($word);
    
    for ($i = 0; $i < strlen($word); $i++) {
        $letter = $word[$i];
        if (isset($values[$letter])) {
            $total += $values[$letter];
        }
        // Non-letter characters? Probably ignore or treat as 0.
    }
    
    return $total;
}
?>