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

class IsbnVerifier
{
    public function isValid(string $isbn): bool
    {
        // Remove hyphens from the ISBN
        $cleaned = str_replace('-', '', $isbn);

        // An ISBN-10 must have exactly 10 characters after removing hyphens
        if (strlen($cleaned) !== 10) {
            return false;
        }

        $sum = 0;

        for ($i = 0; $i < 10; $i++) {
            $char = $cleaned[$i];
            $value = 0;

            if ($i === 9 && $char === 'X') {
                // The last character can be 'X', representing 10
                $value = 10;
            } elseif (ctype_digit($char)) {
                // Must be a digit
                $value = (int)$char;
            } else {
                // Invalid character found
                return false;
            }

            // Multiply by weight (10 down to 1)
            $sum += $value * (10 - $i);
        }

        // Valid if sum is divisible by 11
        return $sum % 11 === 0;
    }
}