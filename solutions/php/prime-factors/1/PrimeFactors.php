<?php
declare(strict_types=1);

function factors(int $number): array
{
    if ($number < 2) {
        return [];
    }
    
    $factors = [];
    $divisor = 2;
    
    while ($divisor * $divisor <= $number) {
        while ($number % $divisor == 0) {
            $factors[] = $divisor;
            $number = intdiv($number, $divisor);
        }
        $divisor++;
    }
    
    if ($number > 1) {
        $factors[] = $number;
    }
    
    return $factors;
}
?>
