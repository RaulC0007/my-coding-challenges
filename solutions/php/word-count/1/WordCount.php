<?php
declare(strict_types=1);

function wordCount(string $words): array
{
    $lower = strtolower($words);
    // Match sequences of letters, digits, and apostrophes
    preg_match_all("/[a-z0-9']+/", $lower, $matches);
    
    $counts = [];
    foreach ($matches[0] as $word) {
        $counts[$word] = ($counts[$word] ?? 0) + 1;
    }
    return $counts;
}
?>