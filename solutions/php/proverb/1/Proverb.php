<?php

declare(strict_types=1);

class Proverb
{
    public function recite(array $items): array
    {
        $lines = [];
        $count = count($items);
        
        // If the list is empty, return empty array
        if ($count === 0) {
            return [];
        }
        
        // Generate the main sequence of lines
        for ($i = 0; $i < $count - 1; $i++) {
            $lines[] = "For want of a {$items[$i]} the {$items[$i + 1]} was lost.";
        }
        
        // Add the final line
        $lines[] = "And all for the want of a {$items[0]}.";
        
        return $lines;
    }
}