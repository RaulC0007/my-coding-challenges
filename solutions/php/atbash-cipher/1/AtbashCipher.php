<?php

declare(strict_types=1);

function encode(string $text): string
{
    $result = '';
    $groupCount = 0;
    
    for ($i = 0; $i < strlen($text); $i++) {
        $char = $text[$i];
        
        // Handle letters
        if (ctype_alpha($char)) {
            $lowerChar = strtolower($char);
            $result .= transformLetter($lowerChar);
            $groupCount++;
        }
        // Handle digits
        elseif (ctype_digit($char)) {
            $result .= $char;
            $groupCount++;
        }
        // Skip punctuation and spaces for encoding
        
        // Add space every 5 characters
        if ($groupCount === 5) {
            $result .= ' ';
            $groupCount = 0;
        }
    }
    
    return rtrim($result);
}

function decode(string $text): string
{
    $result = '';
    
    for ($i = 0; $i < strlen($text); $i++) {
        $char = $text[$i];
        
        // Handle letters
        if (ctype_alpha($char)) {
            $lowerChar = strtolower($char);
            $result .= transformLetter($lowerChar);
        }
        // Handle digits
        elseif (ctype_digit($char)) {
            $result .= $char;
        }
        // Skip spaces for decoding
    }
    
    return $result;
}

function transformLetter(string $letter): string
{
    // Atbash transformation: a↔z, b↔y, c↔x, etc.
    if ($letter >= 'a' && $letter <= 'z') {
        $position = ord($letter) - ord('a');
        $mirrorPosition = 25 - $position;
        return chr(ord('a') + $mirrorPosition);
    }
    return $letter;
}