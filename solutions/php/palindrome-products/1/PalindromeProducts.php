<?php

declare(strict_types=1);

function smallest(int $min, int $max): array
{
    validateRange($min, $max);
    
    $smallestPalindrome = null;
    $factors = [];
    
    // We need to find the smallest palindrome product
    for ($product = $min * $min; $product <= $max * $max; $product++) {
        if (isPalindrome($product)) {
            // Check if this product can be formed by factors in range
            $productFactors = findFactorsInRange($product, $min, $max);
            if (!empty($productFactors)) {
                $smallestPalindrome = $product;
                $factors = $productFactors;
                break;
            }
        }
    }
    
    if ($smallestPalindrome === null) {
        throw new \Exception("No palindrome found in range");
    }
    
    return [$smallestPalindrome, $factors];
}

function largest(int $min, int $max): array
{
    validateRange($min, $max);
    
    $largestPalindrome = null;
    $factors = [];
    
    // We need to find the largest palindrome product
    // Start from the largest possible product and go downwards
    for ($product = $max * $max; $product >= $min * $min; $product--) {
        if (isPalindrome($product)) {
            // Check if this product can be formed by factors in range
            $productFactors = findFactorsInRange($product, $min, $max);
            if (!empty($productFactors)) {
                $largestPalindrome = $product;
                $factors = $productFactors;
                break;
            }
        }
    }
    
    if ($largestPalindrome === null) {
        throw new \Exception("No palindrome found in range");
    }
    
    return [$largestPalindrome, $factors];
}

function validateRange(int $min, int $max): void
{
    if ($min > $max) {
        throw new \InvalidArgumentException("min must be <= max");
    }
}

function isPalindrome(int $number): bool
{
    $str = (string)$number;
    return $str === strrev($str);
}

function findFactorsInRange(int $product, int $min, int $max): array
{
    $factors = [];
    
    // We only need to check up to sqrt($product) to avoid duplicates
    $limit = (int)sqrt($product);
    
    for ($i = $min; $i <= min($max, $limit); $i++) {
        if ($product % $i === 0) {
            $j = $product / $i;
            
            // Check if both factors are within range
            if ($j >= $min && $j <= $max) {
                // Sort the pair so we always have [smaller, larger]
                $pair = $i <= $j ? [$i, $j] : [$j, $i];
                
                // Add to factors array if not already present
                $key = "{$pair[0]},{$pair[1]}";
                if (!isset($factors[$key])) {
                    $factors[$key] = $pair;
                }
            }
        }
    }
    
    // Return values sorted by first factor, then second
    usort($factors, function($a, $b) {
        if ($a[0] === $b[0]) {
            return $a[1] <=> $b[1];
        }
        return $a[0] <=> $b[0];
    });
    
    return $factors;
}