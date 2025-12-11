<?php
declare(strict_types=1);

function slices(string $digits, int $series): array
{
    $len = strlen($digits);
    
    if ($series <= 0) {
        throw new InvalidArgumentException("Series length must be positive");
    }
    if ($series > $len) {
        throw new InvalidArgumentException("Series length cannot be greater than string length");
    }
    
    $result = [];
    for ($i = 0; $i <= $len - $series; $i++) {
        $result[] = substr($digits, $i, $series);
    }
    
    return $result;
}
?>