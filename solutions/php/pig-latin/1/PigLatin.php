<?php
declare(strict_types=1);

function translate(string $text): string
{
    $words = explode(' ', $text);
    $result = [];
    
    foreach ($words as $word) {
        $result[] = translateWord($word);
    }
    
    return implode(' ', $result);
}

function translateWord(string $word): string
{
    $vowels = ['a', 'e', 'i', 'o', 'u'];
    
    // Rule 1: starts with vowel sound
    if (in_array($word[0], $vowels) || substr($word, 0, 2) === 'xr' || substr($word, 0, 2) === 'yt') {
        return $word . 'ay';
    }
    
    // Rule 3 & 4 & 2
    $len = strlen($word);
    for ($i = 0; $i < $len; $i++) {
        $ch = $word[$i];
        
        // Check for 'qu' case
        if ($i + 1 < $len && $ch === 'q' && $word[$i + 1] === 'u') {
            $cluster = substr($word, 0, $i + 2);
            $rest = substr($word, $i + 2);
            return $rest . $cluster . 'ay';
        }
        
        // If we find a vowel (including 'y' after consonants)
        if (in_array($ch, $vowels) || ($ch === 'y' && $i > 0)) {
            $cluster = substr($word, 0, $i);
            $rest = substr($word, $i);
            return $rest . $cluster . 'ay';
        }
    }
    
    // Fallback (shouldn't happen)
    return $word . 'ay';
}
?>