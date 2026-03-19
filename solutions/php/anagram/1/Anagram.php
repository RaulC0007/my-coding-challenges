<?php

declare(strict_types=1);

function detectAnagrams(string $word, array $anagrams): array
{
    $result = [];
    $normalizedWord = strtolower($word);
    $sortedWord = sortLetters($normalizedWord);
    
    foreach ($anagrams as $candidate) {
        $normalizedCandidate = strtolower($candidate);
        
        // Skip if it's the exact same word (case-insensitive)
        if ($normalizedCandidate === $normalizedWord) {
            continue;
        }
        
        // Check if sorted letters match
        if (sortLetters($normalizedCandidate) === $sortedWord) {
            $result[] = $candidate;
        }
    }
    
    return $result;
}

function sortLetters(string $word): string
{
    $letters = str_split($word);
    sort($letters);
    return implode('', $letters);
}