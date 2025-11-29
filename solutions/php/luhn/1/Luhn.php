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

function isValid(string $number): bool
{
    // Remove all spaces
    $cleanNumber = str_replace(' ', '', $number);
    
    // Check if string contains only digits and has length > 1
    if (strlen($cleanNumber) <= 1 || !ctype_digit($cleanNumber)) {
        return false;
    }
    
    $digits = str_split($cleanNumber);
    $n = count($digits);
    $sum = 0;
    
    // Process from right to left, doubling every second digit starting from the second from right
    for ($i = $n - 1; $i >= 0; $i--) {
        $digit = (int)$digits[$i];
        
        // Check if this is a second digit from the right (every second digit starting from the right)
        // Index $i from the right is at position ($n - 1 - $i) from the right
        // So we double digits at positions 1, 3, 5, ... from the right (i.e., even indices from right)
        if (($n - 1 - $i) % 2 == 1) {  // Every second digit starting from the second from right
            $doubled = $digit * 2;
            if ($doubled > 9) {
                $doubled -= 9;
            }
            $sum += $doubled;
        } else {
            $sum += $digit;
        }
    }
    
    // Check if the sum is divisible by 10
    return $sum % 10 === 0;
}