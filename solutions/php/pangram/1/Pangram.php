<?php
declare(strict_types=1);

function isPangram(string $string): bool
{
    $lower = strtolower($string);
    $letters = [];
    
    for ($i = 0; $i < strlen($lower); $i++) {
        $ch = $lower[$i];
        if ($ch >= 'a' && $ch <= 'z') {
            $letters[$ch] = true;
        }
    }
    
    return count($letters) === 26;
}
?>