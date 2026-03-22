<?php

declare(strict_types=1);

function distance(string $strandA, string $strandB): int
{
    // Check if strands are of equal length
    if (strlen($strandA) !== strlen($strandB)) {
        throw new InvalidArgumentException('DNA strands must be of equal length.');
    }
    
    $distance = 0;
    $length = strlen($strandA);
    
    // Compare each character position
    for ($i = 0; $i < $length; $i++) {
        if ($strandA[$i] !== $strandB[$i]) {
            $distance++;
        }
    }
    
    return $distance;
}