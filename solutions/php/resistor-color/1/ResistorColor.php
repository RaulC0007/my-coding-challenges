<?php

declare(strict_types=1);

function getAllColors(): array
{
    return [
        'black',
        'brown', 
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'violet',
        'grey',
        'white'
    ];
}

function colorCode(string $color): int
{
    $colors = getAllColors();
    return array_search($color, $colors, true);
}