<?php
declare(strict_types=1);

function isArmstrongNumber(int $number): bool
{
    $str = (string)$number;
    $len = strlen($str);
    $sum = 0;
    
    for ($i = 0; $i < $len; $i++) {
        $digit = (int)$str[$i];
        $sum += $digit ** $len;
    }
    
    return $sum === $number;
}
?>
