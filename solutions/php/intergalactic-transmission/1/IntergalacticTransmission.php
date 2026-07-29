<?php

declare(strict_types=1);

function countBits(int $byte): int
{
    $count = 0;
    for ($i = 0; $i < 8; $i++) {
        if ($byte & (1 << $i)) {
            $count++;
        }
    }
    return $count;
}

function transmitSequence(array $sequence): array
{
    if (empty($sequence)) {
        return [];
    }
    
    // Convert hex strings to integers
    $bytes = array_map(function($b) {
        if (is_string($b) && str_starts_with($b, '0x')) {
            return hexdec(substr($b, 2));
        }
        return (int)$b;
    }, $sequence);
    
    $result = [];
    $buffer = 0;
    $bitCount = 0;
    
    foreach ($bytes as $byte) {
        // Add the byte to the buffer
        $buffer = ($buffer << 8) | $byte;
        $bitCount += 8;
        
        while ($bitCount >= 7) {
            // Extract 7 bits from the buffer
            $shift = $bitCount - 7;
            $dataBits = ($buffer >> $shift) & 0x7F;
            $bitCount = $shift;
            
            // Remove the extracted bits from the buffer
            $buffer = $buffer & ((1 << $bitCount) - 1);
            
            // Calculate parity bit
            $parityBit = countBits($dataBits) % 2;
            
            // Create byte with parity bit as LSB
            $transmittedByte = ($dataBits << 1) | $parityBit;
            $result[] = '0x' . str_pad(dechex($transmittedByte), 2, '0', STR_PAD_LEFT);
        }
    }
    
    // Handle any remaining bits
    if ($bitCount > 0) {
        $dataBits = $buffer << (7 - $bitCount);
        $parityBit = countBits($dataBits) % 2;
        $transmittedByte = ($dataBits << 1) | $parityBit;
        $result[] = '0x' . str_pad(dechex($transmittedByte), 2, '0', STR_PAD_LEFT);
    }
    
    return $result;
}

function decodeMessage(array $message): array
{
    if (empty($message)) {
        return [];
    }
    
    $bytes = array_map(function($b) {
        if (is_string($b) && str_starts_with($b, '0x')) {
            return hexdec(substr($b, 2));
        }
        return (int)$b;
    }, $message);
    
    $dataBits = '';
    
    foreach ($bytes as $byte) {
        // Check parity
        if (countBits($byte) % 2 !== 0) {
            throw new Exception('wrong parity');
        }
        
        // Extract data bits (remove parity bit)
        $dataBits .= str_pad(decbin($byte >> 1), 7, '0', STR_PAD_LEFT);
    }
    
    // Convert bits back to bytes
    $result = [];
    $totalBits = strlen($dataBits);
    
    // Only process complete bytes (8 bits)
    // Drop any remaining bits (they were padding)
    $completeBytes = floor($totalBits / 8);
    
    for ($i = 0; $i < $completeBytes * 8; $i += 8) {
        $byte = substr($dataBits, $i, 8);
        $result[] = '0x' . str_pad(dechex(bindec($byte)), 2, '0', STR_PAD_LEFT);
    }
    
    return $result;
}