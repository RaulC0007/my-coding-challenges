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

class SpiralMatrix
{
    public function draw(int $n): array
    {
        if ($n === 0) {
            return [];
        }

        // Initialize the matrix with zeros
        $matrix = array_fill(0, $n, array_fill(0, $n, 0));

        $top = 0;
        $bottom = $n - 1;
        $left = 0;
        $right = $n - 1;
        
        $num = 1;
        $total = $n * $n;

        while ($num <= $total) {
            // Traverse from left to right along the top row
            for ($i = $left; $i <= $right; $i++) {
                $matrix[$top][$i] = $num++;
            }
            $top++;

            // Traverse from top to bottom along the right column
            for ($i = $top; $i <= $bottom; $i++) {
                $matrix[$i][$right] = $num++;
            }
            $right--;

            // Traverse from right to left along the bottom row
            if ($top <= $bottom) {
                for ($i = $right; $i >= $left; $i--) {
                    $matrix[$bottom][$i] = $num++;
                }
                $bottom--;
            }

            // Traverse from bottom to top along the left column
            if ($left <= $right) {
                for ($i = $bottom; $i >= $top; $i--) {
                    $matrix[$i][$left] = $num++;
                }
                $left++;
            }
        }

        return $matrix;
    }
}