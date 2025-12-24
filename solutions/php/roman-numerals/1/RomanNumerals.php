<?php
declare(strict_types=1);

function toRoman(int $number): string
{
    if ($number < 1 || $number > 3999) {
        throw new InvalidArgumentException('Number must be between 1 and 3999');
    }
    
    $map = [
        1000 => 'M',
        900 => 'CM',
        500 => 'D',
        400 => 'CD',
        100 => 'C',
        90 => 'XC',
        50 => 'L',
        40 => 'XL',
        10 => 'X',
        9 => 'IX',
        5 => 'V',
        4 => 'IV',
        1 => 'I',
    ];
    
    $result = '';
    foreach ($map as $value => $symbol) {
        while ($number >= $value) {
            $result .= $symbol;
            $number -= $value;
        }
    }
    
    return $result;
}
?>