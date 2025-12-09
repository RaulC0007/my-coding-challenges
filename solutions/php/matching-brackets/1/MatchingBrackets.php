<?php
declare(strict_types=1);

function brackets_match(string $input): bool
{
    $stack = [];
    $pairs = [
        ')' => '(',
        ']' => '[',
        '}' => '{',
    ];
    
    for ($i = 0; $i < strlen($input); $i++) {
        $ch = $input[$i];
        
        if (in_array($ch, ['(', '[', '{'])) {
            array_push($stack, $ch);
        } elseif (array_key_exists($ch, $pairs)) {
            if (empty($stack)) {
                return false;
            }
            $top = array_pop($stack);
            if ($top !== $pairs[$ch]) {
                return false;
            }
        }
    }
    
    return empty($stack);
}
?>