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

class Series
{
    private string $input;

    public function __construct(string $input)
    {
        // Validate that the input contains only digits
        if (!empty($input) && !ctype_digit($input)) {
            throw new InvalidArgumentException("Input must only contain digits");
        }
        
        $this->input = $input;
    }

    public function largestProduct(int $span): int
    {
        // Validate span
        if ($span < 0) {
            throw new InvalidArgumentException("Span must be greater than or equal to zero");
        }
        
        if ($span > strlen($this->input)) {
            throw new InvalidArgumentException("Span must be smaller than string length");
        }
        
        // Special case: span of 0 should return 1 (product of empty set is 1)
        if ($span === 0) {
            return 1;
        }
        
        $maxProduct = 0;
        
        // Iterate through all possible series of the given span
        for ($i = 0; $i <= strlen($this->input) - $span; $i++) {
            $series = substr($this->input, $i, $span);
            $product = 1;
            
            // Calculate the product of the current series
            for ($j = 0; $j < strlen($series); $j++) {
                $digit = (int)$series[$j];
                $product *= $digit;
            }
            
            // Update maxProduct if the current product is larger
            if ($product > $maxProduct) {
                $maxProduct = $product;
            }
        }
        
        return $maxProduct;
    }
}