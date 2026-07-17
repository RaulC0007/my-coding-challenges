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

function squareRoot(int $number): int
{
    // Handle edge cases
    if ($number === 0 || $number === 1) {
        return $number;
    }
    
    // Binary search for the square root
    $left = 1;
    $right = $number;
    
    while ($left <= $right) {
        $mid = intdiv($left + $right, 2);
        $square = $mid * $mid;
        
        if ($square === $number) {
            return $mid;
        } elseif ($square < $number) {
            $left = $mid + 1;
        } else {
            $right = $mid - 1;
        }
    }
    
    // For perfect squares, we should always find an exact match above
    // This return is a fallback for non-perfect squares (floor of square root)
    return $right;
}