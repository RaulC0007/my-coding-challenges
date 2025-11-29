<?php

declare(strict_types=1);

function isIsogram(string $word): bool
{
    // Convert to lowercase for case-insensitive comparison
    $lowercaseWord = strtolower($word);
    
    $seenLetters = [];
    
    for ($i = 0; $i < strlen($lowercaseWord); $i++) {
        $char = $lowercaseWord[$i];
        
        // Skip spaces and hyphens
        if ($char === ' ' || $char === '-') {
            continue;
        }
        
        // Check if we've seen this letter before
        if (in_array($char, $seenLetters)) {
            return false;
        }
        
        // Add the letter to seen letters
        $seenLetters[] = $char;
    }
    
    return true;
}