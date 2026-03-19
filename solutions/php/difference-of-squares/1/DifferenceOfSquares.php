<?php

declare(strict_types=1);

/**
 * Square of the sum of the first $max natural numbers
 * Formula: (n * (n + 1) / 2)²
 */
function squareOfSum(int $max): int
{
    $sum = $max * ($max + 1) / 2;
    return (int) ($sum * $sum);
}

/**
 * Sum of squares of the first $max natural numbers
 * Formula: n * (n + 1) * (2n + 1) / 6
 */
function sumOfSquares(int $max): int
{
    return (int) ($max * ($max + 1) * (2 * $max + 1) / 6);
}

/**
 * Difference between square of sum and sum of squares
 */
function difference(int $max): int
{
    return squareOfSum($max) - sumOfSquares($max);
}