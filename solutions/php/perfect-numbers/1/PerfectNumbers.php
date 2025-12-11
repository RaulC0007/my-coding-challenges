<?php
declare(strict_types=1);

function getClassification(int $number): string
{
    if ($number <= 0) {
        throw new InvalidArgumentException("Number must be positive");
    }
    
    $aliquotSum = 0;
    for ($i = 1; $i <= $number / 2; $i++) {
        if ($number % $i === 0) {
            $aliquotSum += $i;
        }
    }
    
    if ($aliquotSum === $number) {
        return 'perfect';
    } elseif ($aliquotSum > $number) {
        return 'abundant';
    } else {
        return 'deficient';
    }
}
?>