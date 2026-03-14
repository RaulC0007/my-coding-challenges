<?php

/*
 * By adding type hints and enabling strict type checking, code can become
 * easier to read, self-documenting and reduce the number of potential bugs.
 * By default, type declarations are non-strict, which means they will attempt
 * to change the original type to match the type specified by the
 * type-declaration.
 *
 * In other words, if you pass a string to a function requiring a float,
 * it will attempt to convert the string value to a float.
 *
 * To enable strict mode, a single declare directive must be placed at the top
 * of the file.
 * This means that the strictness of typing is configured on a per-file basis.
 * This directive not only affects the type declarations of parameters, but also
 * a function's return type.
 *
 * For more info review the Concept on strict type checking in the PHP track
 * <link>.
 *
 * To disable strict typing, comment out the directive below.
 */

declare(strict_types=1);

class KillerSudokuHelper
{
    public function combinations(int $sum, int $size, array $exclude): array
    {
        $result = [];
        // Get available digits (1-9) excluding the forbidden ones
        $available = array_values(array_diff(range(1, 9), $exclude));
        
        // Use backtracking to find all valid combinations
        $this->backtrack($available, $size, $sum, 0, [], $result);
        
        return $result;
    }
    
    private function backtrack(array $available, int $size, int $target, int $start, array $current, array &$result): void
    {
        // Base case: if we have selected the required number of digits
        if (count($current) === $size) {
            // If the sum matches, we found a valid combination
            if ($target === 0) {
                $result[] = $current;
            }
            return;
        }
        
        // Try each available digit starting from $start index
        for ($i = $start; $i < count($available); $i++) {
            $digit = $available[$i];
            
            // Pruning: if digit is greater than remaining target, 
            // all subsequent digits will also be too large (since array is sorted)
            if ($digit > $target) {
                break;
            }
            
            // Include this digit in the current combination
            $current[] = $digit;
            
            // Recurse with reduced target and next starting index
            // (i+1 ensures we don't reuse the same digit)
            $this->backtrack($available, $size, $target - $digit, $i + 1, $current, $result);
            
            // Backtrack: remove the last added digit to try other possibilities
            array_pop($current);
        }
    }
}