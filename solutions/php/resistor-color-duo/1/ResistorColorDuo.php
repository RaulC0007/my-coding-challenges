<?php

declare(strict_types=1);

class ResistorColorDuo
{
    public function getColorsValue(array $colors): int
    {
        $colorMap = [
            'black' => 0,
            'brown' => 1,
            'red' => 2,
            'orange' => 3,
            'yellow' => 4,
            'green' => 5,
            'blue' => 6,
            'violet' => 7,
            'grey' => 8,
            'white' => 9
        ];
        
        // Get the first two colors and convert to their numerical values
        $firstColor = $colorMap[$colors[0]];
        $secondColor = $colorMap[$colors[1]];
        
        // Combine into a two-digit number
        return ($firstColor * 10) + $secondColor;
    }
}