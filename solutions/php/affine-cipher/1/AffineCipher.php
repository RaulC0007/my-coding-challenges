<?php
declare(strict_types=1);

function gcd(int $a, int $b): int
{
    while ($b != 0) {
        $temp = $b;
        $b = $a % $b;
        $a = $temp;
    }
    return $a;
}

function modInverse(int $a, int $m): int
{
    for ($x = 1; $x < $m; $x++) {
        if (($a * $x) % $m == 1) {
            return $x;
        }
    }
    throw new InvalidArgumentException("No modular inverse exists");
}

function encode(string $text, int $a, int $b): string
{
    $m = 26;
    if (gcd($a, $m) != 1) {
        throw new InvalidArgumentException("a and m must be coprime");
    }
    
    $result = '';
    $groupCount = 0;
    
    for ($i = 0; $i < strlen($text); $i++) {
        $ch = strtolower($text[$i]);
        
        if (ctype_digit($ch)) {
            $result .= $ch;
            $groupCount++;
        } elseif (ctype_lower($ch)) {
            $idx = ord($ch) - ord('a');
            $enc = ($a * $idx + $b) % $m;
            $result .= chr($enc + ord('a'));
            $groupCount++;
        }
        // Ignore other chars
        
        if ($groupCount == 5) {
            $result .= ' ';
            $groupCount = 0;
        }
    }
    
    return rtrim($result);
}

function decode(string $text, int $a, int $b): string
{
    $m = 26;
    if (gcd($a, $m) != 1) {
        throw new InvalidArgumentException("a and m must be coprime");
    }
    
    $inv = modInverse($a, $m);
    $result = '';
    
    for ($i = 0; $i < strlen($text); $i++) {
        $ch = $text[$i];
        
        if (ctype_digit($ch)) {
            $result .= $ch;
        } elseif (ctype_lower($ch)) {
            $idx = ord($ch) - ord('a');
            $dec = ($inv * ($idx - $b)) % $m;
            if ($dec < 0) $dec += $m;
            $result .= chr($dec + ord('a'));
        }
        // Ignore spaces
    }
    
    return $result;
}
?>