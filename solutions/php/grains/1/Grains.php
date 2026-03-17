<?php
declare(strict_types=1);

function doubleString(string $num): string
{
    $result = '';
    $carry = 0;
    for ($i = strlen($num) - 1; $i >= 0; $i--) {
        $digit = (int)$num[$i] * 2 + $carry;
        $result = ($digit % 10) . $result;
        $carry = (int)($digit / 10);
    }
    if ($carry > 0) {
        $result = $carry . $result;
    }
    return $result;
}

function square(int $number): string
{
    if ($number < 1 || $number > 64) {
        throw new InvalidArgumentException('Square must be between 1 and 64');
    }
    
    $grains = '1';
    for ($i = 1; $i < $number; $i++) {
        $grains = doubleString($grains);
    }
    return $grains;
}

function total(): string
{
    // total = 2^64 - 1
    $grains63 = square(64); // 2^63
    $grains64 = doubleString($grains63); // 2^64
    
    // Subtract 1
    $len = strlen($grains64);
    $result = '';
    $borrow = 1;
    for ($i = $len - 1; $i >= 0; $i--) {
        $digit = (int)$grains64[$i] - $borrow;
        if ($digit < 0) {
            $digit += 10;
            $borrow = 1;
        } else {
            $borrow = 0;
        }
        $result = $digit . $result;
    }
    // Remove leading zeros
    $result = ltrim($result, '0');
    return $result === '' ? '0' : $result;
}
?>