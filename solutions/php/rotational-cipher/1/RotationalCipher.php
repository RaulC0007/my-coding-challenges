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

class RotationalCipher
{
    public function rotate(string $text, int $shift): string
    {
        $result = '';
        
        for ($i = 0; $i < strlen($text); $i++) {
            $char = $text[$i];
            
            // Check if it's a lowercase letter
            if ($char >= 'a' && $char <= 'z') {
                // Shift within lowercase range using modular arithmetic
                $shifted = (ord($char) - ord('a') + $shift) % 26;
                $result .= chr(ord('a') + $shifted);
            }
            // Check if it's an uppercase letter
            elseif ($char >= 'A' && $char <= 'Z') {
                // Shift within uppercase range using modular arithmetic
                $shifted = (ord($char) - ord('A') + $shift) % 26;
                $result .= chr(ord('A') + $shifted);
            }
            // Non-alphabetic characters remain unchanged
            else {
                $result .= $char;
            }
        }
        
        return $result;
    }
}