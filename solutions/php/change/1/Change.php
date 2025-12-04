<?php
declare(strict_types=1);

function findFewestCoins(array $coins, int $amount): array
{
    if ($amount < 0) {
        throw new InvalidArgumentException('Cannot make change for negative value');
    }
    
    if ($amount === 0) {
        return [];
    }
    
    // Sort coins in descending order for greedy algorithm optimization
    rsort($coins);
    
    // Use dynamic programming to find minimum coins needed
    $minCoins = array_fill(0, $amount + 1, PHP_INT_MAX);
    $minCoins[0] = 0;
    
    $lastCoin = array_fill(0, $amount + 1, 0);
    
    for ($i = 1; $i <= $amount; $i++) {
        foreach ($coins as $coin) {
            if ($coin <= $i && $minCoins[$i - $coin] + 1 < $minCoins[$i]) {
                $minCoins[$i] = $minCoins[$i - $coin] + 1;
                $lastCoin[$i] = $coin;
            }
        }
    }
    
    if ($minCoins[$amount] === PHP_INT_MAX) {
        // Check if any coin is smaller than the amount (for test #11)
        $smallestCoin = min($coins);
        if ($smallestCoin > $amount) {
            throw new InvalidArgumentException('No coins small enough to make change');
        } else {
            throw new InvalidArgumentException('No combination can add up to target');
        }
    }
    
    // Reconstruct the solution
    $result = [];
    $currentAmount = $amount;
    
    while ($currentAmount > 0) {
        $coin = $lastCoin[$currentAmount];
        $result[] = $coin;
        $currentAmount -= $coin;
    }
    
    // Sort the result to match expected output format
    sort($result);
    
    return $result;
}