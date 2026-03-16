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

function pascalsTriangleRows(int $rowCount): array
{
    // Handle edge case
    if ($rowCount <= 0) {
        return [];
    }
    
    $triangle = [];
    
    for ($row = 0; $row < $rowCount; $row++) {
        $currentRow = [];
        
        // Calculate each element in the current row
        for ($col = 0; $col <= $row; $col++) {
            // Use binomial coefficient formula: C(row, col) = row! / (col! * (row-col)!)
            // But we can calculate it iteratively to avoid large factorials
            
            // For the first and last elements in a row, the value is always 1
            if ($col === 0 || $col === $row) {
                $currentRow[] = 1;
            } else {
                // Use Pascal's rule: C(n,k) = C(n-1,k-1) + C(n-1,k)
                // We need to get values from the previous row
                $prevRow = $triangle[$row - 1];
                $value = $prevRow[$col - 1] + $prevRow[$col];
                $currentRow[] = $value;
            }
        }
        
        $triangle[] = $currentRow;
    }
    
    return $triangle;
}