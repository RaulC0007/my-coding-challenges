<?php
declare(strict_types=1);

function diamond(string $letter): array
{
    if ($letter === 'A') {
        return ['A'];
    }
    
    $n = ord($letter) - ord('A'); // 0 for A, 1 for B, etc.
    $size = 2 * $n + 1;
    $diamond = [];
    
    for ($i = 0; $i <= $n; $i++) {
        $row = str_repeat(' ', $size);
        $currentLetter = chr(ord('A') + $i);
        $leftPos = $n - $i;
        $rightPos = $n + $i;
        
        $row[$leftPos] = $currentLetter;
        $row[$rightPos] = $currentLetter;
        $diamond[] = $row;
    }
    
    // Bottom half (excluding middle row)
    for ($i = $n - 1; $i >= 0; $i--) {
        $diamond[] = $diamond[$i];
    }
    
    return $diamond;
}
?>