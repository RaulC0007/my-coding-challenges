<?php
declare(strict_types=1);

function sumOfMultiples(int $number, array $multiples): int
{
    $uniqueMultiples = [];
    
    foreach ($multiples as $m) {
        if ($m === 0) continue;
        
        for ($i = $m; $i < $number; $i += $m) {
            $uniqueMultiples[$i] = true;
        }
    }
    
    return array_sum(array_keys($uniqueMultiples));
}
?>