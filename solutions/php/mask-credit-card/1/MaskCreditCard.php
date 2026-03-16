<?php

declare(strict_types=1);

function maskify(string $cc): string
{
    // Return '' when input is empty
    if (empty($cc)) {
        return '';
    }
    
    // Do not mask if the input is less than 6
    if (strlen($cc) < 6) {
        return $cc;
    }
    
    $masked = '';
    $length = strlen($cc);
    
    for ($i = 0; $i < $length; $i++) {
        $char = $cc[$i];
        
        // Check if character is a digit
        if (ctype_digit($char)) {
            // Do not mask the first digit and the last four digits
            if ($i === 0 || $i >= $length - 4) {
                $masked .= $char;
            } else {
                $masked .= '#';
            }
        } else {
            // Do not mask non-digit chars
            $masked .= $char;
        }
    }
    
    return $masked;
}