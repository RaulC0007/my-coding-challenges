<?php
declare(strict_types=1);

function total(array $items): int
{
    $unit = 800; // $8 in cents
    $discount = [0, 5, 10, 20, 25]; // % for 1..5 different books
    
    // Count frequency
    $freq = array_count_values($items);
    
    // Array to count groups of each size
    $groups = array_fill(1, 5, 0);
    
    while (!empty($freq)) {
        $setSize = count($freq);
        $groups[$setSize]++;
        
        // Remove one from each
        foreach ($freq as $t => $n) {
            if (--$freq[$t] === 0) {
                unset($freq[$t]);
            }
        }
    }
    
    // Apply optimization: replace (5,3) with (4,4)
    while ($groups[5] > 0 && $groups[3] > 0) {
        $groups[5]--;
        $groups[3]--;
        $groups[4] += 2;
    }
    
    // Calculate total cost
    $totalCents = 0;
    for ($i = 1; $i <= 5; $i++) {
        if ($groups[$i] > 0) {
            $price = $i * $unit * (100 - $discount[$i - 1]) / 100;
            $totalCents += (int)round($price) * $groups[$i];
        }
    }
    
    return (int)$totalCents;
}
?>