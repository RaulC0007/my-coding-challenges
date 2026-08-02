<?php

declare(strict_types=1);

function saddlePoints(array $matrix): array
{
    if (empty($matrix) || empty($matrix[0])) {
        return [];
    }
    
    $rows = count($matrix);
    $cols = count($matrix[0]);
    
    // Find the maximum value in each row
    $rowMax = array_map(function($row) {
        return max($row);
    }, $matrix);
    
    // Find the minimum value in each column
    $colMin = [];
    for ($col = 0; $col < $cols; $col++) {
        $min = PHP_INT_MAX;
        for ($row = 0; $row < $rows; $row++) {
            if ($matrix[$row][$col] < $min) {
                $min = $matrix[$row][$col];
            }
        }
        $colMin[] = $min;
    }
    
    // Find saddle points (0-indexed coordinates)
    $saddlePoints = [];
    for ($row = 0; $row < $rows; $row++) {
        for ($col = 0; $col < $cols; $col++) {
            $value = $matrix[$row][$col];
            if ($value === $rowMax[$row] && $value === $colMin[$col]) {
                // Convert to 1-indexed coordinates
                $saddlePoints[] = ['row' => $row + 1, 'column' => $col + 1];
            }
        }
    }
    
    return $saddlePoints;
}