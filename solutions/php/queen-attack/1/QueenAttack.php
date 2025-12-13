<?php
declare(strict_types=1);

function placeQueen(int $xCoordinate, int $yCoordinate): bool
{
    if ($xCoordinate < 0 || $yCoordinate < 0) {
        throw new InvalidArgumentException('The rank and file numbers must be positive.');
    }
    if ($xCoordinate > 7 || $yCoordinate > 7) {
        throw new InvalidArgumentException('The position must be on a standard size chess board.');
    }
    return true;
}

function canAttack(array $whiteQueen, array $blackQueen): bool
{
    // Validate positions
    placeQueen($whiteQueen[0], $whiteQueen[1]);
    placeQueen($blackQueen[0], $blackQueen[1]);
    
    // Check same row, column, or diagonal
    $dx = abs($whiteQueen[0] - $blackQueen[0]);
    $dy = abs($whiteQueen[1] - $blackQueen[1]);
    
    return $dx === 0 || $dy === 0 || $dx === $dy;
}
?>