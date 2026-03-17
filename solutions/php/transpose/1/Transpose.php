<?php

declare(strict_types=1);

function transpose(array $lines): array
{
    if (empty($lines)) {
        return [""];
    }

    // Find the maximum length of any line
    $maxLength = 0;
    foreach ($lines as $line) {
        $maxLength = max($maxLength, strlen($line));
    }

    // Build transposed rows
    $result = [];

    for ($col = 0; $col < $maxLength; $col++) {
        $newRow = '';

        for ($row = 0; $row < count($lines); $row++) {
            // If the current row is shorter than $col, pad with space on the LEFT
            // But only if we're not on the last column
            if ($col >= strlen($lines[$row])) {
                // Add space only if this is not the last column that needs padding
                // We add spaces only when there is at least one longer row below
                $hasContentBelow = false;
                for ($lowerRow = $row + 1; $lowerRow < count($lines); $lowerRow++) {
                    if ($col < strlen($lines[$lowerRow])) {
                        $hasContentBelow = true;
                        break;
                    }
                }
                $newRow .= $hasContentBelow ? ' ' : '';
            } else {
                $newRow .= $lines[$row][$col];
            }
        }

        // Only add non-empty rows (or space-padded) rows
        // But we must include trailing spaces if required
        $result[] = $newRow;
    }

    // Remove empty rows at the end (but keep spaces in middle/right)
    while (end($result) === '') {
        array_pop($result);
    }

    return $result ?: [""];
}