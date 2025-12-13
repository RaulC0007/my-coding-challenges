<?php
declare(strict_types=1);

function calculate(string $input): int
{
    // Check format
    if (!preg_match('/^What is (.+)\?$/', $input, $match)) {
        throw new InvalidArgumentException('Invalid question format');
    }
    
    $expr = $match[1];
    
    // Normalize: replace 'multiplied by' and 'divided by' with single tokens
    $expr = str_replace('multiplied by', 'multiplied_by', $expr);
    $expr = str_replace('divided by', 'divided_by', $expr);
    
    // Split by spaces
    $tokens = explode(' ', $expr);
    
    // First token must be a number
    if (!is_numeric($tokens[0])) {
        throw new InvalidArgumentException('Invalid expression');
    }
    
    $result = (int)$tokens[0];
    $i = 1;
    $len = count($tokens);
    
    while ($i < $len) {
        // Expect operator
        $op = $tokens[$i];
        if (!in_array($op, ['plus', 'minus', 'multiplied_by', 'divided_by'])) {
            throw new InvalidArgumentException('Unknown operation');
        }
        
        // Expect number next
        $i++;
        if ($i >= $len || !is_numeric($tokens[$i])) {
            throw new InvalidArgumentException('Missing number after operation');
        }
        
        $num = (int)$tokens[$i];
        
        // Apply operation
        switch ($op) {
            case 'plus':
                $result += $num;
                break;
            case 'minus':
                $result -= $num;
                break;
            case 'multiplied_by':
                $result *= $num;
                break;
            case 'divided_by':
                if ($num == 0) {
                    throw new InvalidArgumentException('Division by zero');
                }
                $result = intdiv($result, $num);
                break;
        }
        
        $i++;
    }
    
    return $result;
}
?>