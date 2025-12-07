<?php
declare(strict_types=1);

function crypto_square(string $plaintext): string
{
    // 1. Normalize
    $normalized = preg_replace('/[^a-z0-9]/', '', strtolower($plaintext));
    $len = strlen($normalized);
    
    if ($len === 0) {
        return '';
    }
    
    // 2. Determine r and c
    $c = (int)ceil(sqrt($len));
    $r = (int)floor($len / $c);
    if ($r * $c < $len) {
        $r++;
    }
    
    // Ensure c >= r and c - r <= 1
    while ($c < $r || $c - $r > 1) {
        if ($c < $r) {
            $c++;
        } else {
            $r++;
        }
    }
    
    // 3. Pad string and create rows
    $padded = str_pad($normalized, $r * $c, ' ');
    $rows = str_split($padded, $c);
    
    // 4. Read down columns
    $encodedChars = [];
    for ($col = 0; $col < $c; $col++) {
        for ($row = 0; $row < $r; $row++) {
            $encodedChars[] = $rows[$row][$col] ?? ' ';
        }
    }
    
    // 5. Group into c chunks of r characters
    $chunks = str_split(implode('', $encodedChars), $r);
    
    return implode(' ', $chunks);
}
?>