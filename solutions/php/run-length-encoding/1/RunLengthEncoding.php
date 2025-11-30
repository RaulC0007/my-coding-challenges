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

function encode(string $input): string
{
    if (empty($input)) {
        return '';
    }
    
    $result = '';
    $currentChar = $input[0];
    $count = 1;
    
    for ($i = 1; $i < strlen($input); $i++) {
        if ($input[$i] === $currentChar) {
            $count++;
        } else {
            // Add the run to the result
            if ($count > 1) {
                $result .= $count . $currentChar;
            } else {
                $result .= $currentChar;
            }
            
            // Start a new run
            $currentChar = $input[$i];
            $count = 1;
        }
    }
    
    // Add the last run
    if ($count > 1) {
        $result .= $count . $currentChar;
    } else {
        $result .= $currentChar;
    }
    
    return $result;
}

function decode(string $input): string
{
    if (empty($input)) {
        return '';
    }
    
    $result = '';
    $i = 0;
    
    while ($i < strlen($input)) {
        $count = '';
        
        // Extract the count (if any) - read consecutive digits
        while ($i < strlen($input) && ctype_digit($input[$i])) {
            $count .= $input[$i];
            $i++;
        }
        
        // Get the character
        $char = $input[$i];
        $i++;
        
        // Repeat the character 'count' times (or once if no count was specified)
        $repeatCount = $count === '' ? 1 : (int)$count;
        $result .= str_repeat($char, $repeatCount);
    }
    
    return $result;
}