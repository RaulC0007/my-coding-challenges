<?php
declare(strict_types=1);

function nucleotideCount(string $input): array
{
    // Validate that the input contains only A, C, G, T (case-sensitive)
    if (!preg_match('/^[ACGT]*$/', $input)) {
        throw new InvalidArgumentException("Invalid DNA sequence: contains characters other than A, C, G, T");
    }
    
    // Initialize counts with lowercase keys
    $counts = [
        'a' => 0,
        'c' => 0,
        't' => 0,
        'g' => 0
    ];
    
    for ($i = 0; $i < strlen($input); $i++) {
        $nucleotide = strtolower($input[$i]);
        $counts[$nucleotide]++;
    }
    
    return $counts;
}
?>