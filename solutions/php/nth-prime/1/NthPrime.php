<?php
declare(strict_types=1);

function prime(int $number)
{
    if ($number < 1) return false;   // ← return false, not throw

    $count = 0;
    $candidate = 2;
    while (true) {
        if (isPrime($candidate)) {
            $count++;
            if ($count === $number) return $candidate;
        }
        $candidate++;
    }
}

function isPrime(int $n): bool
{
    if ($n < 2) return false;
    if ($n % 2 === 0) return $n === 2;
    for ($d = 3; $d * $d <= $n; $d += 2) {
        if ($n % $d === 0) return false;
    }
    return true;
}