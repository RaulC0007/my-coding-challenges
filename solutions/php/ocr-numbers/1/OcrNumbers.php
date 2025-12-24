<?php
declare(strict_types=1);

function recognize(array $input): string
{
    $rows = count($input);
    if ($rows % 4 != 0) {
        throw new InvalidArgumentException('Number of lines must be multiple of 4');
    }
    $cols = strlen($input[0]);
    if ($cols % 3 != 0) {
        throw new InvalidArgumentException('Line length must be multiple of 3');
    }
    
    $digitsPerRow = $cols / 3;
    $resultRows = [];
    
    // Known patterns for digits 0-9
    $patterns = [
        " _ | ||_|" => '0',
        "     |  |" => '1',
        " _  _||_ " => '2',
        " _  _| _|" => '3',
        "   |_|  |" => '4',
        " _ |_  _|" => '5',
        " _ |_ |_|" => '6',
        " _   |  |" => '7',
        " _ |_||_|" => '8',
        " _ |_| _|" => '9',
    ];
    
    for ($row = 0; $row < $rows; $row += 4) {
        $rowDigits = '';
        for ($cell = 0; $cell < $digitsPerRow; $cell++) {
            $pattern = '';
            for ($line = 0; $line < 4; $line++) {
                $lineStr = $input[$row + $line];
                $pattern .= substr($lineStr, $cell * 3, 3);
            }
            // Pad pattern to 9 chars (3x3 for top 3 rows? Wait we have 4 rows → 12 chars)
            // Actually pattern is 4 lines of 3 chars = 12 chars.
            // Our map uses 9 chars? Let's adjust.
            // The standard OCR digits problem uses 3 rows (excluding blank bottom row).
            // Here they say 3x4 with fourth blank row. So we ignore fourth row? Wait they include it.
            // Let's use 3 rows (top 3) for matching.
            $key = substr($pattern, 0, 9);
            $rowDigits .= $patterns[$key] ?? '?';
        }
        $resultRows[] = $rowDigits;
    }
    
    return implode(',', $resultRows);
}
?>
    |