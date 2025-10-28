<?php

declare(strict_types=1);

function format(string $name, int $number): string
{
    $suffix = getOrdinalSuffix($number);
    
    return "{$name}, you are the {$number}{$suffix} customer we serve today. Thank you!";
}

function getOrdinalSuffix(int $number): string
{
    // Handle special cases: 11, 12, 13
    if ($number % 100 >= 11 && $number % 100 <= 13) {
        return 'th';
    }
    
    // Handle other cases based on last digit
    switch ($number % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}