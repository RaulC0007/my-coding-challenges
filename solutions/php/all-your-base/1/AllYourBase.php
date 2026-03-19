<?php

declare(strict_types=1);

/**
 * Converts a number from one base to another.
 *
 * @param int   $fromBase The base of the input digits (2 ≤ fromBase ≤ 36)
 * @param array $digits   Array of digits representing the number in $fromBase
 * @param int   $toBase   The target base (2 ≤ toBase ≤ 36)
 * @return array          Digits representing the same number in $toBase
 *
 * @throws InvalidArgumentException if input is invalid
 */
function rebase(int $fromBase, array $digits, int $toBase): array
{
    // Validate bases with specific error messages
    if ($fromBase < 2) {
        throw new InvalidArgumentException('input base must be >= 2');
    }
    
    if ($toBase < 2) {
        throw new InvalidArgumentException('output base must be >= 2');
    }

    // Validate digits with specific error message
    foreach ($digits as $digit) {
        if ($digit < 0 || $digit >= $fromBase) {
            throw new InvalidArgumentException('all digits must satisfy 0 <= d < input base');
        }
    }

    // Handle empty input or zero
    if (empty($digits)) {
        return [0];
    }
    
    // If all digits are 0, return [0]
    $allZeros = true;
    foreach ($digits as $digit) {
        if ($digit !== 0) {
            $allZeros = false;
            break;
        }
    }
    
    if ($allZeros) {
        return [0];
    }

    // Step 1: Convert from base $fromBase → decimal (base 10)
    $decimal = 0;
    foreach ($digits as $digit) {
        $decimal = $decimal * $fromBase + $digit;
    }

    // Step 2: Convert from decimal → base $toBase
    $result = [];
    while ($decimal > 0) {
        $result[] = $decimal % $toBase;
        $decimal = intdiv($decimal, $toBase); // integer division
    }

    // Result is built in reverse, so reverse it
    return array_reverse($result);
}