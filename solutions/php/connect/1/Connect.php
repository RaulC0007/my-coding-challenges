<?php

declare(strict_types=1);

function winner(array $lines): ?string
{
    if (empty($lines)) {
        return null;
    }

    // Parse board: remove all spaces and build compact 2D array
    $board = array_map(
        fn($line) => array_values(array_filter(str_split($line), fn($c) => $c !== ' ')),
        $lines
    );

    // Remove any empty rows (just in case)
    $board = array_values(array_filter($board, fn($row) => !empty($row)));

    if (empty($board)) {
        return null;
    }

    $height = count($board);
    $width  = count($board[0]);

    // Special case: 1×1 board
    if ($height === 1 && $width === 1) {
        return $board[0][0] === 'X' ? 'black' : ($board[0][0] === 'O' ? 'white' : null);
    }

    // Check if X (black) connects left to right
    if (hasConnectedPath($board, 'X', fn($r, $c) => $c === 0, fn($r, $c) => $c === $width - 1)) {
        return 'black';
    }

    // Check if O (white) connects top to bottom
    if (hasConnectedPath($board, 'O', fn($r, $c) => $r === 0, fn($r, $c) => $r === $height - 1)) {
        return 'white';
    }

    return null;
}

function hasConnectedPath(array $board, string $player, callable $isStart, callable $isGoal): bool
{
    $height = count($board);
    $width  = count($board[0]);
    $visited = array_fill(0, $height, array_fill(0, $width, false));
    $queue = new SplQueue();

    // Start from all cells on the starting border owned by player
    for ($r = 0; $r < $height; $r++) {
        for ($c = 0; $c < $width; $c++) {
            if ($board[$r][$c] === $player && $isStart($r, $c)) {
                $queue->enqueue([$r, $c]);
                $visited[$r][$c] = true;
            }
        }
    }

    if ($queue->isEmpty()) {
        return false;
    }

    // Correct 6 hexagonal neighbors for this layout (pointy-top hex with odd-r offset)
    $directions = [
        [-1,  0], [-1,  1],   // North, North-East
        [ 0, -1], [ 0,  1],   // West,  East
        [ 1, -1], [ 1,  0],   // South-West, South
    ];

    while (!$queue->isEmpty()) {
        [$r, $c] = $queue->dequeue();

        if ($isGoal($r, $c)) {
            return true;
        }

        foreach ($directions as [$dr, $dc]) {
            $nr = $r + $dr;
            $nc = $c + $dc;

            if ($nr >= 0 && $nr < $height &&
                $nc >= 0 && $nc < $width &&
                !$visited[$nr][$nc] &&
                $board[$nr][$nc] === $player) {
                $visited[$nr][$nc] = true;
                $queue->enqueue([$nr, $nc]);
            }
        }
    }

    return false;
}