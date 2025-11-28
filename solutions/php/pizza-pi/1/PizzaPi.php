<?php

class PizzaPi
{
    public function calculateDoughRequirement(int $pizzas, int $persons): int
    {
        return (int) round($pizzas * ($persons * 20 + 200));
    }

    public function calculateSauceRequirement(int $pizzas, int $sauceCanVolume): int
    {
        return (int) ceil($pizzas * 125 / $sauceCanVolume);
    }

    public function calculateCheeseCubeCoverage(int $cheeseDimension, float $thickness, int $diameter): int
    {
        return (int) floor($cheeseDimension ** 3 / ($thickness * M_PI * $diameter));
    }

    public function calculateLeftOverSlices(int $pizzas, int $friends): int
    {
        return (8 * $pizzas) % $friends;
    }
}