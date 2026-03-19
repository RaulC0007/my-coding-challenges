<?php

declare(strict_types=1);

class ResistorColorTrio
{
    private array $colorValues = [
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

    public function label(array $colors): string
    {
        // Get the numeric values for the first two colors
        $firstDigit = $this->colorValues[$colors[0]];
        $secondDigit = $this->colorValues[$colors[1]];
        
        // Calculate the main value (first two digits)
        $mainValue = $firstDigit * 10 + $secondDigit;
        
        // Get the multiplier from the third color (number of zeros)
        $multiplier = $this->colorValues[$colors[2]];
        
        // Calculate the total resistance value
        $resistance = $mainValue * (10 ** $multiplier);
        
        // Format with appropriate metric prefix
        return $this->formatResistance($resistance);
    }
    
    private function formatResistance(int $resistance): string
    {
        if ($resistance >= 1000000000) {
            return ($resistance / 1000000000) . " gigaohms";
        } elseif ($resistance >= 1000000) {
            return ($resistance / 1000000) . " megaohms";
        } elseif ($resistance >= 1000) {
            return ($resistance / 1000) . " kiloohms";
        } else {
            return $resistance . " ohms";
        }
    }
}