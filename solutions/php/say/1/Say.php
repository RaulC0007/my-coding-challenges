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

function say(int $number): string
{
    if ($number < 0 || $number >= 1000000000000) {
        throw new InvalidArgumentException("Input out of range");
    }

    if ($number === 0) {
        return "zero";
    }

    $scales = [
        ['', ''],
        ['thousand', 'thousand'],
        ['million', 'million'],
        ['billion', 'billion'],
    ];

    $chunks = [];
    $scaleIndex = 0;

    while ($number > 0) {
        $chunkValue = $number % 1000;
        $number = intdiv($number, 1000);

        if ($chunkValue > 0) {
            $chunkWords = convertChunk($chunkValue);
            if ($scaleIndex > 0) {
                $chunkWords .= ' ' . $scales[$scaleIndex][0];
            }
            $chunks[] = $chunkWords;
        }

        $scaleIndex++;
    }

    return implode(' ', array_reverse($chunks));
}

function convertChunk(int $number): string
{
    $ones = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    $tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    $result = '';

    // Handle hundreds
    if ($number >= 100) {
        $result .= $ones[intdiv($number, 100)] . ' hundred';
        $number %= 100;
        if ($number > 0) {
            $result .= ' ';
        }
    }

    // Handle tens and ones
    if ($number > 0) {
        if ($number < 20) {
            $result .= $ones[$number];
        } else {
            $tensDigit = intdiv($number, 10);
            $onesDigit = $number % 10;
            
            $result .= $tens[$tensDigit];
            
            if ($onesDigit > 0) {
                $result .= '-' . $ones[$onesDigit];
            }
        }
    }

    return $result;
}