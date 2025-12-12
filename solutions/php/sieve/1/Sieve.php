<?php
declare(strict_types=1);

function sieve(int $number): array
{
    if ($number < 2) {
        return [];
    }
    
    $isPrime = array_fill(2, $number - 1, true);
    $limit = (int)sqrt($number);
    
    for ($p = 2; $p <= $limit; $p++) {
        if ($isPrime[$p]) {
            for ($multiple = $p * $p; $multiple <= $number; $multiple += $p) {
                $isPrime[$multiple] = false;
            }
        }
    }
    
    $primes = [];
    for ($i = 2; $i <= $number; $i++) {
        if ($isPrime[$i]) {
            $primes[] = $i;
        }
    }
    
    return $primes;
}
?>